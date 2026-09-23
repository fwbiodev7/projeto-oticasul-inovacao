'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import type { FrameShape, ProductCategory } from '@/types';
import { products } from '@/lib/mock-data';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  const [category, setCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [shape, setShape] = useState<FrameShape | 'Todos'>('Todos');
  const [limit, setLimit] = useState(8);
  const filtered = useMemo(() => products.filter(p => (category === 'Todos' || p.category === category) && (shape === 'Todos' || p.frameShape === shape)), [category, shape]);
  return <><CategoryFilter category={category} shape={shape} onCategory={v => { setCategory(v); setLimit(8); }} onShape={v => { setShape(v); setLimit(8); }} /><div className="mb-5 mt-8 flex items-center gap-2 text-xs font-medium text-ink/60"><SlidersHorizontal size={15} />{filtered.length} modelos encontrados</div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.slice(0, limit).map(p => <ProductCard key={p.id} product={p} />)}</div>{filtered.length === 0 && <p className="rounded-2xl bg-light p-12 text-center text-primary/60">Nenhuma armação encontrada para esses filtros.</p>}{filtered.length > limit && <div className="mt-10 text-center"><button type="button" onClick={() => setLimit(limit + 8)} className="btn-outline">Ver mais modelos</button></div>}</>;
}
