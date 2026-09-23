import Image from 'next/image';
import { ArrowUpRight, Heart } from 'lucide-react';
import type { Product } from '@/types';
import { whatsappUrl } from '@/lib/mock-data';

export function ProductCard({ product }: { product: Product }) {
  return <article className="group overflow-hidden rounded-[1.35rem] border border-primary/5 bg-white shadow-[0_6px_25px_rgba(10,55,102,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-soft">
    <div className="relative aspect-[1.08] overflow-hidden bg-[#f3f8fa]"><Image src={product.image} alt={`Armação ilustrativa ${product.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-primary shadow-sm">{product.category}</span><Heart size={18} className="absolute right-5 top-5 text-primary/40" /></div>
    <div className="p-5"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-accent">{product.brand}</p><div className="mt-2 flex items-start justify-between gap-3"><h3 className="text-lg font-semibold tracking-tight text-primary">{product.name}</h3><p className="whitespace-nowrap text-base font-bold text-primary">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(product.price)}</p></div><p className="mt-1 text-xs text-ink/55">{product.frameShape} · {product.color}</p><div className="mt-4 flex flex-wrap gap-1.5">{product.tags.map(tag => <span key={tag} className="rounded-full bg-light px-2.5 py-1 text-[10px] font-medium text-primary/70">{tag}</span>)}</div><a href={whatsappUrl(`Olá! Tenho interesse na armação ${product.name} (${product.id}). Pode me ajudar?`)} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between border-t border-primary/10 pt-4 text-xs font-bold text-primary transition hover:text-accent">Consultar disponibilidade <ArrowUpRight size={17} /></a></div>
  </article>;
}
