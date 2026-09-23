import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ScanFace, Sparkles } from 'lucide-react';
import type { FaceAnalysisResult, Product } from '@/types';
import { products } from '@/lib/mock-data';
import { ProductCard } from './ProductCard';
import { WhatsAppButton } from './WhatsAppButton';

export function FaceResult({ result, onRestart }: { result: FaceAnalysisResult; onRestart: () => void }) {
  const chosen = (result.recommendedProducts || [])
    .map(item => ({ product: products.find(product => product.id === item.productId), reason: item.reason }))
    .filter((item): item is { product: Product; reason: string } => Boolean(item.product));
  const message = 'Olá! Fiz o visagismo por IA e gostaria de experimentar estas armações: ' + chosen.map(item => item.product.name).join(', ') + '.';

  return <div className="animate-slide-up space-y-9">
    <div className="grid overflow-hidden rounded-[1.75rem] bg-white shadow-soft md:grid-cols-[.8fr_1.2fr]">
      <div className="flex flex-col justify-center bg-primary p-8 text-white sm:p-10">
        <span className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-accent"><ScanFace size={36} /></span>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Seu resultado</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight">Formato provável: {result.faceShape.toLowerCase()}</h2>
        <p className="mt-4 text-sm leading-7 text-white/70">{result.description}</p>
      </div>
      <div className="p-8 sm:p-10">
        <div className="flex items-center gap-2 text-accent"><Sparkles size={18} /><span className="text-xs font-bold uppercase tracking-[.15em]">{result.source === 'local' ? 'Leitura local dos seus traços' : 'Curadoria por IA para você'}</span></div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-primary">Armações que combinam com seus traços</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {chosen.map(({ product, reason }) => <a key={product.id} href="#recomendados" className="group overflow-hidden rounded-xl border border-primary/10 bg-light/50 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-soft">
            <div className="relative aspect-[1.3] overflow-hidden bg-[#f3f8fa]"><Image src={product.image} alt={'Armação ' + product.name + ' recomendada pela IA'} fill sizes="(max-width: 640px) 45vw, 170px" className="object-cover transition duration-300 group-hover:scale-105" /></div>
            <div className="px-3 py-2.5"><strong className="block text-xs text-primary">{product.name}</strong><span className="mt-0.5 block text-[10px] font-semibold text-accent">{product.frameShape}</span><span className="mt-1.5 block text-[11px] leading-4 text-ink/60">{reason}</span></div>
          </a>)}
        </div>
        <p className="mt-2 text-[11px] text-ink/45">Imagens ilustrativas dos modelos do protótipo.</p>
        {result.source === 'local' && <p className="mt-4 rounded-xl bg-accent/10 px-3 py-2 text-xs leading-5 text-primary">Resultado experimental calculado no seu aparelho a partir dos pontos do rosto.</p>}
        <p className="mt-5 text-sm leading-7 text-ink/70">{result.styleAdvice}</p>
        <div className="mt-7 flex flex-wrap gap-3"><WhatsAppButton message={message}>Agendar atendimento</WhatsAppButton><button type="button" className="btn-outline" onClick={onRestart}>Nova análise</button></div>
      </div>
    </div>
    <div id="recomendados" className="scroll-mt-28">
      <div className="mb-5 flex items-end justify-between gap-4"><div><span className="eyebrow">SELEÇÃO PARA VOCÊ</span><h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary">Que tal experimentar?</h3></div><Link href="/catalogo" className="hidden items-center gap-1 text-sm font-bold text-accent sm:flex">Ver catálogo <ArrowRight size={16} /></Link></div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{chosen.map(({ product }) => <ProductCard key={product.id} product={product} />)}</div>
    </div>
  </div>;
}
