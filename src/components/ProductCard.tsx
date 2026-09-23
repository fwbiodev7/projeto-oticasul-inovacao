import Image from 'next/image';
import { ArrowUpRight, Heart } from 'lucide-react';
import type { Product } from '@/types';
import { whatsappUrl } from '@/lib/mock-data';

export function ProductCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-[1.35rem] border border-primary/5 bg-white shadow-[0_6px_25px_rgba(10,55,102,.035)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(6,51,92,.12)] hover:border-accent/30">
    <div className="relative aspect-[1.08] overflow-hidden bg-[#f3f8fa]">
      <Image src={product.image} alt={`Armação ${product.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">{product.category}</span>
      <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary/40 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:text-accent group-hover:scale-110"><Heart size={16} /></span>
    </div>
    <div className="p-5">
      <p className="text-[10px] font-bold uppercase tracking-[.17em] text-accent">{product.brand}</p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-primary transition-colors group-hover:text-accent">{product.name}</h3>
        <p className="whitespace-nowrap text-base font-bold text-primary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(product.price)}</p>
      </div>
      <p className="mt-1 text-xs text-ink/55">{product.frameShape} · {product.color}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.tags.map(tag => <span key={tag} className="rounded-full bg-light px-2.5 py-1 text-[10px] font-medium text-primary/70 transition-colors group-hover:bg-accent/10 group-hover:text-primary">{tag}</span>)}
      </div>
      <a href={whatsappUrl(`Olá! Tenho interesse na armação ${product.name} (${product.id}). Pode me ajudar?`)} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-xs font-bold text-primary transition-all duration-200 hover:text-accent">
        <span>Consultar disponibilidade</span>
        <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </div>
  </article>;
}
