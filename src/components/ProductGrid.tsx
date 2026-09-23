'use client';

import { useEffect, useMemo, useState } from 'react';
import { PlusCircle, RotateCcw, SlidersHorizontal, Trash2 } from 'lucide-react';
import type { FrameShape, Product, ProductCategory } from '@/types';
import { products as defaultProducts } from '@/lib/mock-data';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { AddProductModal } from './AddProductModal';

const STORAGE_KEY = 'sulotica_custom_products';

export function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts);
  const [category, setCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [shape, setShape] = useState<FrameShape | 'Todos'>('Todos');
  const [limit, setLimit] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load custom products from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllProducts([...parsed, ...defaultProducts]);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar produtos salvos:', e);
    }
  }, []);

  function handleAddProduct(newProduct: Product) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const existing: Product[] = saved ? JSON.parse(saved) : [];
      const updated = [newProduct, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setAllProducts([newProduct, ...allProducts]);
    } catch (e) {
      console.error('Erro ao salvar produto:', e);
    }
  }

  function handleRemoveProduct(id: string) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const existing: Product[] = JSON.parse(saved);
        const filtered = existing.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      }
      setAllProducts(allProducts.filter(p => p.id !== id));
    } catch (e) {
      console.error('Erro ao remover produto:', e);
    }
  }

  function handleReset() {
    if (confirm('Deseja restaurar o catálogo padrão da Sul Ótica?')) {
      localStorage.removeItem(STORAGE_KEY);
      setAllProducts(defaultProducts);
    }
  }

  const customCount = allProducts.filter(p => p.id.startsWith('custom-')).length;

  const filtered = useMemo(
    () =>
      allProducts.filter(
        p => (category === 'Todos' || p.category === category) && (shape === 'Todos' || p.frameShape === shape)
      ),
    [allProducts, category, shape]
  );

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex-1">
          <CategoryFilter
            category={category}
            shape={shape}
            onCategory={v => {
              setCategory(v);
              setLimit(8);
            }}
            onShape={v => {
              setShape(v);
              setLimit(8);
            }}
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-ink/60 border-b border-primary/5 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-accent" />
          <span className="font-semibold text-primary">{filtered.length}</span> modelos encontrados
          {customCount > 0 && (
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold text-accent">
              {customCount} {customCount === 1 ? 'cadastrado por você' : 'cadastrados por você'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {customCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              title="Restaurar catálogo inicial"
              className="flex items-center gap-1 text-[11px] font-semibold text-ink/50 hover:text-red-600 transition mr-2"
            >
              <RotateCcw size={13} /> Restaurar catálogo
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent hover:-translate-y-0.5 transition duration-200"
          >
            <PlusCircle size={15} /> Adicionar Modelo
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, limit).map((p, idx) => (
          <div key={p.id} className="relative group/card animate-slide-up" style={{ animationDelay: `${(idx % 4) * 80}ms` }}>
            <ProductCard product={p} />
            {p.id.startsWith('custom-') && (
              <button
                type="button"
                onClick={() => handleRemoveProduct(p.id)}
                title="Excluir este modelo cadastrado"
                className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-md opacity-80 hover:opacity-100 hover:scale-110 transition"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-primary/10 bg-light p-12 text-center animate-fade-in">
          <p className="text-base font-semibold text-primary">Nenhuma armação encontrada para esses filtros.</p>
          <p className="mt-1 text-xs text-ink/60">Tente selecionar outro formato ou adicione um novo modelo ao catálogo.</p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn-primary mt-5"
          >
            <PlusCircle size={16} /> Cadastrar Nova Armação
          </button>
        </div>
      )}

      {filtered.length > limit && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setLimit(limit + 8)}
            className="btn-outline hover:shadow-soft"
          >
            Ver mais modelos ({filtered.length - limit} restantes)
          </button>
        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}

