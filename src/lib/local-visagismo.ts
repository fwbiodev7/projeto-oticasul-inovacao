import type { FaceAnalysisResult } from '@/types';
import { products } from './mock-data';

type Point = { x: number; y: number };
type Shape = 'Redondo' | 'Quadrado' | 'Oval' | 'Coração' | 'Alongado';

const choices: Record<Shape, { ids: string[]; advice: string; reasons: string[] }> = {
  Redondo: {
    ids: ['11', '02', '09'],
    advice: 'Linhas mais definidas criam contraste com as curvas suaves do rosto. Experimente também a largura da armação presencialmente.',
    reasons: ['As linhas retas trazem definição ao contorno arredondado.', 'O canto elevado cria um contraste delicado com as bochechas.', 'A ponte e a linha superior acrescentam estrutura ao olhar.'],
  },
  Quadrado: {
    ids: ['07', '09', '02'],
    advice: 'Armações de curvas suaves equilibram a mandíbula marcada. Compare tamanhos diferentes para encontrar um encaixe confortável.',
    reasons: ['O formato redondo suaviza os ângulos da mandíbula.', 'As curvas do aviador equilibram as linhas mais retas.', 'O desenho levemente elevado adiciona movimento ao olhar.'],
  },
  Oval: {
    ids: ['02', '11', '09'],
    advice: 'O contorno equilibrado permite variar entre armações expressivas e discretas. Observe a proporção da armação com a largura do rosto.',
    reasons: ['O canto elevado valoriza as proporções equilibradas.', 'A linha retangular traz um contraste contemporâneo.', 'O aviador acrescenta presença sem pesar no rosto.'],
  },
  Coração: {
    ids: ['07', '09', '10'],
    advice: 'Prefira armações que distribuam o destaque entre testa e queixo. Modelos leves ajudam a manter o conjunto equilibrado.',
    reasons: ['As curvas suaves equilibram o queixo mais estreito.', 'A parte inferior ampla compensa a largura da testa.', 'A estrutura discreta acompanha o contorno sem sobrecarregá-lo.'],
  },
  Alongado: {
    ids: ['07', '09', '11'],
    advice: 'Armações com boa altura de lente e presença lateral ajudam a equilibrar o comprimento visual do rosto.',
    reasons: ['O aro redondo acrescenta largura visual ao rosto.', 'A lente alta do aviador equilibra a proporção vertical.', 'A armação marcada cria uma linha horizontal no olhar.'],
  },
};

let detectorPromise: Promise<import('@mediapipe/tasks-vision').FaceLandmarker> | undefined;

async function getDetector() {
  detectorPromise ??= (async () => {
    const { FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision');
    const vision = await FilesetResolver.forVisionTasks('/mediapipe/wasm');
    return FaceLandmarker.createFromOptions(vision, {
      baseOptions: { modelAssetPath: '/mediapipe/face_landmarker.task', delegate: 'CPU' },
      runningMode: 'IMAGE',
      numFaces: 2,
      minFaceDetectionConfidence: 0.6,
      minFacePresenceConfidence: 0.6,
    });
  })().catch(error => { detectorPromise = undefined; throw error; });
  return detectorPromise;
}

function measureFace(landmarks: Point[], width: number, height: number) {
  const eyeLeft = landmarks[33];
  const eyeRight = landmarks[263];
  const angle = Math.atan2((eyeRight.y - eyeLeft.y) * height, (eyeRight.x - eyeLeft.x) * width);
  const centerX = (eyeLeft.x + eyeRight.x) * width / 2;
  const centerY = (eyeLeft.y + eyeRight.y) * height / 2;
  const aligned = landmarks.map(point => {
    const x = point.x * width - centerX;
    const y = point.y * height - centerY;
    return { x: x * Math.cos(angle) + y * Math.sin(angle), y: -x * Math.sin(angle) + y * Math.cos(angle) };
  });
  const distance = (a: number, b: number) => Math.abs(aligned[a].x - aligned[b].x);
  const cheekWidth = distance(234, 454);
  const jawWidth = distance(172, 397);
  const foreheadWidth = distance(127, 356);
  const faceHeight = Math.abs(aligned[152].y - aligned[10].y);
  const contour = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109, 10];
  const top = aligned[10].y;
  const widthAt = (fraction: number) => {
    const target = top + faceHeight * fraction;
    const intersections: number[] = [];
    for (let index = 1; index < contour.length; index++) {
      const a = aligned[contour[index - 1]];
      const b = aligned[contour[index]];
      if ((a.y <= target && b.y >= target) || (b.y <= target && a.y >= target)) {
        const t = (target - a.y) / (b.y - a.y || 1);
        intersections.push(a.x + t * (b.x - a.x));
      }
    }
    return intersections.length >= 2 ? (Math.max(...intersections) - Math.min(...intersections)) / cheekWidth : 0;
  };
  const nose = aligned[1].x;
  const leftHalf = Math.abs(nose - aligned[234].x);
  const rightHalf = Math.abs(aligned[454].x - nose);
  const symmetry = Math.min(leftHalf, rightHalf) / Math.max(leftHalf, rightHalf);
  return {
    aspect: faceHeight / cheekWidth,
    jaw: jawWidth / cheekWidth,
    foreheadJaw: foreheadWidth / jawWidth,
    symmetry,
    eyeTilt: Math.abs(angle) * 180 / Math.PI,
    faceWidth: cheekWidth / width,
    width90: widthAt(.9),
  };
}

export function classifyFaceMetrics(metrics: ReturnType<typeof measureFace>): Shape | null {
  if (!Number.isFinite(metrics.aspect) || metrics.faceWidth < 0.12 || metrics.symmetry < 0.65 || metrics.eyeTilt > 22) return null;
  if (metrics.aspect >= 1.35) return 'Alongado';
  if (metrics.foreheadJaw >= 1.37 && metrics.jaw < 0.75) return 'Coração';
  if (metrics.aspect < 1.16 && metrics.width90 >= 0.61) return 'Redondo';
  if (metrics.jaw >= 0.8 && metrics.aspect <= 1.25) return 'Quadrado';
  return 'Oval';
}

export async function analyzeFaceLocally(imageDataUrl: string): Promise<FaceAnalysisResult> {
  const photo = new Image();
  photo.src = imageDataUrl;
  await photo.decode();

  // Render onto a canvas so MediaPipe receives a stable ImageBitmap-compatible
  // source that doesn't require the element to be attached to the DOM.
  const canvas = document.createElement('canvas');
  canvas.width = photo.naturalWidth;
  canvas.height = photo.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas indisponível para análise local.');
  ctx.drawImage(photo, 0, 0);

  const detector = await getDetector();
  const result = detector.detect(canvas);
  if (result.faceLandmarks.length === 0) {
    throw new Error('Nenhum rosto detectado. Envie uma foto frontal com boa iluminação e rosto visível.');
  }
  if (result.faceLandmarks.length > 1) {
    throw new Error('A análise local precisa de uma foto com apenas um rosto visível.');
  }
  const metrics = measureFace(result.faceLandmarks[0], photo.naturalWidth, photo.naturalHeight);
  const shape = classifyFaceMetrics(metrics);
  if (!shape) throw new Error('Não foi possível medir o contorno nesta foto. Tente uma imagem frontal, nítida e sem inclinar o rosto.');

  const pick = choices[shape];
  const recommendedProducts = pick.ids.map((id, index) => ({ productId: id, reason: pick.reasons[index] }));
  return {
    source: 'local',
    faceShape: shape,
    description: `A leitura dos pontos faciais sugere um contorno ${shape.toLowerCase()}, com proporção aproximada de ${metrics.aspect.toFixed(2).replace('.', ',')} entre altura e largura.`,
    styleAdvice: pick.advice,
    recommendedProducts,
    recommendedFrameShapes: pick.ids.map(id => products.find(product => product.id === id)?.frameShape).filter((s): s is NonNullable<typeof s> => Boolean(s)),
  };
}
