import { GoogleGenAI } from '@google/genai';
import type { FaceAnalysisResult, FrameShape } from '@/types';
import { products } from './mock-data';

const faceShapes = ['Oval', 'Redondo', 'Quadrado', 'Coração', 'Alongado', 'Indefinido'] as const;
const catalog = products.map(({ id, name, category, frameShape, color, tags }) => ({ id, name, category, frameShape, color, tags }));

type FaceObservation = {
  hasFace: boolean;
  faceShape: string;
  faceAspectRatio: number;
  contourEvidence: string;
  confidence: number;
};

type StyleSelection = {
  styleAdvice: string;
  recommendations: Array<{ productId: string; reason: string }>;
};

export class VisagismoError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

const observationSchema = {
  type: 'object',
  properties: {
    hasFace: { type: 'boolean' },
    faceShape: { type: 'string', enum: faceShapes },
    faceAspectRatio: { type: 'number' },
    contourEvidence: { type: 'string' },
    confidence: { type: 'number' },
  },
  required: ['hasFace', 'faceShape', 'faceAspectRatio', 'contourEvidence', 'confidence'],
};

const selectionSchema = {
  type: 'object',
  properties: {
    styleAdvice: { type: 'string' },
    recommendations: {
      type: 'array', minItems: 3, maxItems: 3,
      items: {
        type: 'object',
        properties: {
          productId: { type: 'string', enum: products.map(product => product.id) },
          reason: { type: 'string' },
        },
        required: ['productId', 'reason'],
      },
    },
  },
  required: ['styleAdvice', 'recommendations'],
};

const observationPrompt = [
  'Analise somente o contorno anatômico do rosto na imagem, sem identificar a pessoa ou inferir atributos sensíveis ou saúde.',
  'Ignore cabelos, orelhas, pescoço e a proporção do enquadramento da foto.',
  'Compare a altura da linha de implantação do cabelo até o queixo com a largura máxima do rosto na altura das maçãs.',
  'Estime faceAspectRatio = altura do rosto / largura do rosto, com duas casas decimais. Essa é uma medida visual aproximada.',
  'Classifique Alongado SOMENTE se a altura for claramente pelo menos 1,55 vezes a largura e as laterais forem relativamente paralelas. Um rosto apenas um pouco mais alto que largo não é Alongado.',
  'Classifique Redondo se altura e largura forem próximas, bochechas cheias e mandíbula suave.',
  'Classifique Quadrado se a mandíbula for angulosa e tiver largura parecida com a testa.',
  'Classifique Coração se a testa for visivelmente mais larga que a mandíbula e o queixo for afilado.',
  'Classifique Oval se for moderadamente mais comprido que largo, com contorno suave e sem comprimento extremo.',
  'Se não houver um único rosto frontal nítido, ou não for possível ver o contorno da testa e do queixo para comparar as proporções, use hasFace=false e faceShape=Indefinido.',
  'Em contourEvidence, descreva apenas os traços visuais observados em uma frase breve, em português do Brasil.',
  'Em confidence, indique de 0 a 1 o quanto a foto permite essa classificação. Não force uma categoria quando houver dúvida.',
].join(' ');

function normalizeError(error: unknown, phase: 'contorno' | 'armações'): VisagismoError {
  const status = typeof error === 'object' && error !== null && 'status' in error ? Number(error.status) : undefined;
  const kind = error instanceof Error ? error.name : typeof error;
  const message = error instanceof Error ? error.message : '';
  const secret = process.env.GEMINI_API_KEY;
  console.error('Falha na análise Gemini:', phase, status || kind, (secret ? message.replaceAll(secret, '[redacted]') : message).slice(0, 180));
  if (status === 429 || /too many requests|quota|rate limit/i.test(message)) return new VisagismoError('O limite temporário da IA foi atingido. Aguarde um pouco e tente novamente.', 503);
  if (kind === 'AbortError' || /timed out|timeout/i.test(message)) return new VisagismoError('A análise demorou mais que o esperado. Tente novamente em instantes.', 503);
  if (status === 503) return new VisagismoError('O serviço de IA está temporariamente ocupado. Tente novamente em instantes.', 503);
  if (status === 404) return new VisagismoError('O modelo de IA configurado não está disponível. Confira GEMINI_MODEL.', 503);
  return new VisagismoError('Não foi possível concluir a análise por IA. Tente novamente.', 502);
}

export async function analyzeFace(imageDataUrl: string): Promise<FaceAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new VisagismoError('A análise por IA ainda não está configurada. Adicione GEMINI_API_KEY ao servidor.', 503);
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(imageDataUrl);
  if (!match) throw new VisagismoError('Formato de imagem inválido.', 400);

  const ai = new GoogleGenAI({ apiKey, httpOptions: { timeout: 60_000, retryOptions: { attempts: 2 } } });
  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

  let observation: FaceObservation;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        { inlineData: { mimeType: match[1], data: match[2] } },
        { text: observationPrompt },
      ],
      config: { responseMimeType: 'application/json', responseJsonSchema: observationSchema, temperature: 0 },
    });
    if (!response.text) throw new Error('Resposta vazia do modelo; motivo: ' + response.candidates?.[0]?.finishReason);
    observation = JSON.parse(response.text) as FaceObservation;
  } catch (error) {
    throw normalizeError(error, 'contorno');
  }

  if (!observation.hasFace || observation.faceShape === 'Indefinido') {
    throw new VisagismoError('Não foi possível avaliar o contorno do rosto. Envie uma foto frontal, nítida e com testa e queixo visíveis.', 422);
  }
  if (!faceShapes.includes(observation.faceShape as typeof faceShapes[number])
    || !Number.isFinite(observation.faceAspectRatio)
    || !Number.isFinite(observation.confidence)
    || typeof observation.contourEvidence !== 'string') {
    throw new VisagismoError('A IA não retornou uma análise válida. Tente outra foto.', 502);
  }
  if (observation.confidence < 0.65 || observation.faceAspectRatio < 0.8 || observation.faceAspectRatio > 2.1
    || (observation.faceShape === 'Alongado' && observation.faceAspectRatio < 1.55)) {
    throw new VisagismoError('As proporções do rosto não ficaram claras. Tente uma foto frontal, com o cabelo afastado do contorno facial.', 422);
  }

  let selection: StyleSelection;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        'Você é um consultor de armações. Uma análise visual anterior classificou o contorno aparente como ' + observation.faceShape + ',',
        'com proporção altura/largura estimada em ' + observation.faceAspectRatio.toFixed(2) + ' e estes traços: ' + observation.contourEvidence + '.',
        'Escolha exatamente 3 produtos de formatos diferentes do catálogo a seguir que complementem esses traços.',
        'Use somente os IDs existentes. Para cada produto, explique em uma frase curta por que combina com esse contorno.',
        'Escreva também styleAdvice em até duas frases curtas. Não reclassifique o rosto nem alegue precisão clínica.',
        'Responda em português do Brasil. Catálogo: ' + JSON.stringify(catalog),
      ].join(' '),
      config: { responseMimeType: 'application/json', responseJsonSchema: selectionSchema, temperature: 0.2 },
    });
    if (!response.text) throw new Error('Resposta vazia do modelo; motivo: ' + response.candidates?.[0]?.finishReason);
    selection = JSON.parse(response.text) as StyleSelection;
  } catch (error) {
    throw normalizeError(error, 'armações');
  }

  if (typeof selection.styleAdvice !== 'string' || !Array.isArray(selection.recommendations)) {
    throw new VisagismoError('A IA não retornou recomendações válidas. Tente novamente.', 502);
  }
  const seenIds = new Set<string>();
  const seenShapes = new Set<FrameShape>();
  const recommendations = selection.recommendations.filter(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product || typeof item.reason !== 'string' || !item.reason.trim() || seenIds.has(product.id) || seenShapes.has(product.frameShape)) return false;
    seenIds.add(product.id); seenShapes.add(product.frameShape);
    return true;
  });
  if (recommendations.length !== 3) throw new VisagismoError('A IA não conseguiu selecionar três armações distintas. Tente novamente.', 502);

  return {
    source: 'gemini',
    faceShape: observation.faceShape,
    description: observation.contourEvidence.trim(),
    styleAdvice: selection.styleAdvice.trim(),
    recommendedProducts: recommendations,
    recommendedFrameShapes: recommendations.map(item => products.find(p => p.id === item.productId)!.frameShape),
  };
}
