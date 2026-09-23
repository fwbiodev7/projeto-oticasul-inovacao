'use client';

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Camera, Check, ImagePlus, LoaderCircle, RotateCcw, ScanFace, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react';
import type { FaceAnalysisResult } from '@/types';
import { FaceResult } from './FaceResult';

type Stage = 'upload' | 'preview' | 'loading' | 'result';

export function FaceAnalyzer() {
  const [stage, setStage] = useState<Stage>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  function stopCamera() { streamRef.current?.getTracks().forEach(track => track.stop()); streamRef.current = null; setCameraOpen(false); }
  useEffect(() => () => streamRef.current?.getTracks().forEach(track => track.stop()), []);
  // Assign srcObject whenever cameraOpen becomes true and the video element is available.
  // We use a layout effect so the assignment happens after the DOM update.
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => { /* autoplay blocked */ });
    }
  }, [cameraOpen]);

  async function processFile(file?: File) {
    setError('');
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Use uma imagem JPG, PNG ou WebP.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('A foto deve ter até 10 MB.'); return; }
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas indisponível');
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      setImage(canvas.toDataURL('image/jpeg', .86));
      setStage('preview');
      stopCamera();
    } catch { setError('Não foi possível abrir a foto. Tente novamente.'); }
  }

  async function openCamera() {
    setError('');
    try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false }); streamRef.current = stream; setCameraOpen(true); }
    catch { setError('Não foi possível acessar a câmera. Verifique a permissão do navegador ou envie uma foto.'); }
  }

  function takePhoto() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) { setError('A câmera ainda está iniciando. Tente novamente.'); return; }
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1200 / video.videoWidth);
    canvas.width = Math.round(video.videoWidth * scale); canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    setImage(canvas.toDataURL('image/jpeg', .82)); setStage('preview'); stopCamera();
  }

  async function analyze(mode: 'gemini' | 'local') {
    if (!image) return;
    setError(''); setStage('loading');
    try {
      let analysis: FaceAnalysisResult;
      if (mode === 'local') {
        const { analyzeFaceLocally } = await import('@/lib/local-visagismo');
        analysis = await analyzeFaceLocally(image);
      } else {
        try {
          const response = await fetch('/api/visagismo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image }) });
          const data = await response.json();
          if (response.ok) analysis = data as FaceAnalysisResult;
          else if (response.status >= 500) {
            const { analyzeFaceLocally } = await import('@/lib/local-visagismo');
            analysis = await analyzeFaceLocally(image);
          } else throw new Error(data.error || 'Não foi possível analisar a foto.');
        } catch (fetchErr) {
          // If server is unreachable or offline, attempt local analysis as seamless fallback
          if (fetchErr instanceof Error && (fetchErr.message.includes('fetch') || fetchErr.message.includes('Failed to fetch') || fetchErr.message.includes('NetworkError'))) {
            const { analyzeFaceLocally } = await import('@/lib/local-visagismo');
            analysis = await analyzeFaceLocally(image);
          } else {
            throw fetchErr;
          }
        }
      }
      setResult(analysis); setStage('result');
    } catch (e) { setError(e instanceof Error ? e.message : 'Ocorreu um erro. Tente novamente.'); setStage('preview'); }
  }

  function restart() { stopCamera(); setImage(null); setResult(null); setStage('upload'); setError(''); if (inputRef.current) inputRef.current.value = ''; }
  function onDrop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); processFile(event.dataTransfer.files[0]); }
  function onInput(event: ChangeEvent<HTMLInputElement>) { processFile(event.target.files?.[0]); }

  return <div id="experimente" className="scroll-mt-28">
    <div className="mb-8 flex items-center justify-center gap-3 sm:gap-5" aria-label="Etapas do visagismo">{[['01', 'Sua foto'], ['02', 'Análise'], ['03', 'Seu estilo']].map(([n, label], i) => <div key={n} className="flex items-center gap-3 sm:gap-5"><span className={'flex items-center gap-2 text-xs font-bold ' + ((stage === 'result' || (stage === 'loading' && i <= 1) || (stage === 'preview' && i === 0) || (stage === 'upload' && i === 0)) ? 'text-primary' : 'text-primary/35')}><span className={'flex h-8 w-8 items-center justify-center rounded-full text-[10px] ' + ((stage === 'result' || (stage === 'loading' && i <= 1) || (stage === 'preview' && i === 0) || (stage === 'upload' && i === 0)) ? 'bg-accent text-white' : 'bg-primary/5')}>{stage === 'result' && i < 2 ? <Check size={15} /> : n}</span><span className="hidden sm:inline">{label}</span></span>{i < 2 && <span className="h-px w-6 bg-primary/15 sm:w-14" />}</div>)}</div>
    {stage === 'result' && result ? <FaceResult result={result} onRestart={restart} /> : <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-primary/10 bg-white p-5 shadow-soft sm:p-9">
      {stage === 'upload' && <><div className="mb-7 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent"><ImagePlus size={24} /></span><h2 className="mt-4 text-2xl font-semibold text-primary">Vamos encontrar seu novo olhar?</h2><p className="mt-2 text-sm text-ink/60">Envie uma foto de frente, com boa iluminação, cabelo afastado e contorno do rosto visível.</p></div>{cameraOpen ? <div className="overflow-hidden rounded-2xl bg-primary"><video ref={videoRef} autoPlay playsInline muted className="aspect-video w-full object-cover" /><div className="flex justify-center gap-3 p-4"><button type="button" onClick={takePhoto} className="btn-primary"><Camera size={17} />Capturar foto</button><button type="button" onClick={stopCamera} className="rounded-full px-4 text-sm font-semibold text-white">Cancelar</button></div></div> : <div onDragOver={e => e.preventDefault()} onDrop={onDrop} className="rounded-2xl border-2 border-dashed border-accent/35 bg-light/60 px-5 py-10 text-center transition hover:border-accent hover:bg-accent/5"><UploadCloud size={33} className="mx-auto text-accent" /><p className="mt-4 text-sm font-semibold text-primary">Arraste sua foto até aqui</p><p className="mt-1 text-xs text-ink/50">JPG, PNG ou WebP · até 10 MB</p><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onInput} className="sr-only" aria-label="Escolher foto do rosto" /><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => inputRef.current?.click()} className="btn-primary"><ImagePlus size={17} />Escolher foto</button><button type="button" onClick={openCamera} className="btn-outline"><Camera size={17} />Usar câmera</button></div></div>}<p className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-ink/50"><ShieldCheck size={16} />Sua foto é usada apenas durante esta análise e não é salva pelo protótipo.</p></>}
      {stage === 'preview' && image && <><div className="mb-6 flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-accent">Sua foto</p><h2 className="mt-2 text-2xl font-semibold text-primary">Pronto para descobrir?</h2></div><button type="button" onClick={restart} className="flex items-center gap-1 text-xs font-semibold text-primary/60 hover:text-accent transition"><RotateCcw size={15} />Trocar foto</button></div><div className="relative mx-auto aspect-[4/3] max-w-sm overflow-hidden rounded-2xl bg-light shadow-inner"><Image src={image} alt="Prévia da foto enviada" fill unoptimized sizes="384px" className="object-contain" /></div><div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => analyze('gemini')} className="btn-primary"><Sparkles size={18} />Analisar com IA<ArrowRight size={17} /></button><button type="button" onClick={() => analyze('local')} className="btn-outline"><ScanFace size={18} />Testar sem usar cota</button></div><p className="mt-5 text-center text-xs leading-6 text-ink/55">Na <strong>Análise com IA</strong>, modelos avançados em nuvem avaliam suas proporções faciais e recomendam opções sob medida. No <strong>teste local</strong>, o cálculo ocorre no seu próprio aparelho sem consumir dados. Nenhuma foto é armazenada pelo sistema.</p></>}
      {stage === 'loading' && <div className="py-20 text-center"><div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 text-accent"><LoaderCircle size={43} className="animate-spin" /><span className="absolute inset-[-9px] animate-pulse rounded-full border border-accent/20" /></div><h2 className="mt-7 text-2xl font-semibold text-primary">Encontrando seu estilo...</h2><p className="mt-2 text-sm text-ink/60">Só um instante enquanto preparamos suas recomendações.</p></div>}
      {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    </div>}
  </div>;
}
