import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ScanFace, Sparkles } from 'lucide-react';

export function HeroSection() {
  return <section className="relative overflow-hidden bg-[#f2f8fb]">
    <div className="absolute left-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_20%_70%,rgba(24,169,229,.12),transparent_58%)]" />
    <div className="container-wide relative grid min-h-[600px] items-center gap-10 py-14 lg:grid-cols-[1fr_1.06fr] lg:py-20">
      <div className="relative z-10 max-w-[660px] animate-fade-in">
        <span className="eyebrow"><span className="relative flex h-2 w-2"><span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span></span> DESDE 1980, CUIDANDO DO SEU OLHAR</span>
        <h1 className="mt-8 max-w-[650px] text-[clamp(3rem,5.4vw,5.75rem)] font-semibold leading-[1.06] tracking-[-.055em] text-primary">Enxergue o mundo <span className="font-serif italic font-normal text-accent">do seu jeito.</span></h1>
        <p className="mt-6 max-w-lg text-base leading-8 text-ink/70 sm:text-lg">A tradição da Sul Ótica encontra uma experiência feita para você. Descubra armações que valorizam seu rosto com a ajuda da inteligência artificial.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/visagismo" className="btn-primary"><ScanFace size={19} />Analisar meu rosto<ArrowRight size={18} /></Link><Link href="/catalogo" className="btn-outline">Explorar coleção<ArrowRight size={18} /></Link></div>
        <div className="mt-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.13em] text-primary/55"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-accent shadow-sm"><Sparkles size={17} /></span> Visagismo inteligente · Atendimento humano</div>
      </div>
      <div className="relative min-h-[380px] self-stretch lg:min-h-[530px]">
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-[#dbe9ed] shadow-soft group"><Image src="/images/hero-editorial.png" alt="Modelo usando armação de óculos em campanha ilustrativa" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[63%_center] transition-transform duration-1000 ease-out group-hover:scale-105" /></div>
        <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-soft backdrop-blur sm:-left-7 sm:p-5 border border-primary/5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent"><ScanFace size={24} /></span><span><strong className="block text-sm text-primary">Seu estilo começa aqui</strong><small className="text-xs text-ink/60">Uma nova perspectiva para seu olhar</small></span></div>
      </div>
    </div>
  </section>;
}
