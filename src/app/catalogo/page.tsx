import type { Metadata } from 'next';
import { ProductGrid } from '@/components/ProductGrid';

export const metadata: Metadata = { title: 'Catálogo' };

export default function CatalogPage() {
  return <><section className="bg-light"><div className="container-wide py-16 sm:py-20"><span className="eyebrow">ESCOLHA SEU PRÓXIMO OLHAR</span><h1 className="section-title mt-4">Uma coleção para <span className="font-serif italic font-normal text-accent">cada versão de você.</span></h1><p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base">Explore formatos, descubra novos favoritos e encontre a armação que acompanha seu jeito de ver o mundo.</p></div></section><section className="container-wide py-10 pb-24"><ProductGrid /><p className="mt-8 text-center text-xs text-ink/45">Imagens, modelos e preços ilustrativos. Consulte disponibilidade e condições na loja.</p></section></>;
}
