'use client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { whatsappUrl } from '@/lib/mock-data';
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export function ProductCard({ product }: { product: Product }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const href = whatsappUrl('Olá! Tenho interesse na armação ' + product.name + ' da marca ' + product.brand + ' (' + product.id + '). Pode me ajudar?');
  return <article className="product-card group">
    <a href={href} target="_blank" rel="noopener noreferrer" className="product-image block" aria-label={'Consultar ' + product.name + ' no WhatsApp'}>
      <Image src={failedImage === product.image ? '/images/frame-champagne.png' : product.image} onError={() => setFailedImage(product.image)} alt={'Armação ' + product.name} fill unoptimized={!product.image.startsWith('/images/')} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
      <span className="product-category">Óculos de {product.category.toLowerCase()}</span><span className="product-arrow"><ArrowUpRight size={17} /></span>
    </a>
    <div className="py-5"><p className="text-[8px] font-semibold uppercase tracking-[.18em] text-accent">{product.brand}</p>
      <h3 className="mt-2 text-[17px] font-medium tracking-tight text-primary">{product.name}</h3>
      <p className="mt-1 text-[11px] text-ink/55">{product.frameShape} · {product.color}</p>
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-primary/10 pt-3"><span className="text-[13px] font-semibold">{money.format(product.price)}</span><a href={href} target="_blank" rel="noopener noreferrer" className="text-[10px] text-ink/60 underline underline-offset-4 hover:text-primary">Quero conhecer</a></div>
    </div>
  </article>;
}
