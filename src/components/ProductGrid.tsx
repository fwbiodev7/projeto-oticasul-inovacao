'use client';

import { useEffect, useMemo, useState } from 'react';
import { PlusCircle, RotateCcw, SlidersHorizontal, Trash2 } from 'lucide-react';
import type { FrameShape, Product, ProductCategory } from '@/types';
import {
  loadCatalog,
  addCatalogProduct,
  deleteCatalogProduct,
  resetCatalogToDefault,
  CATALOG_CHANGE_EVENT,
} from '@/lib/catalog-storage';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard } from './ProductCard';
import { AddProductModal } from './AddProductModal';

export function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<ProductCategory | 'Todos'>('Todos');
  const [shape, setShape] = useState<FrameShape | 'Todos'>('Todos');
  const [limit, setLimit] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Carregar produtos e escutar alterações vindas do painel /admsecreto ou de outras abas
  useEffect(() => {
    setAllProducts(loadCatalog());

    function handleCatalogChange() {
      setAllProducts(loadCatalog());
    }

    window.addEventListener(CATALOG_CHANGE_EVENT, handleCatalogChange);
    window.addEventListener('storage', handleCatalogChange);

    return () => {
      window.removeEventListener(CATALOG_CHANGE_EVENT, handleCatalogChange);
      window.removeEventListener('storage', handleCatalogChange);
    };
  }, []);

  function handleAddProduct(newProduct: Product) {
    const updated = addCatalogProduct(newProduct);
    setAllProducts(updated);
  }

  function handleRemoveProduct(id: string) {
    if (confirm('Deseja excluir esta armação do catálogo?')) {
      const updated = deleteCatalogProduct(id);
      setAllProducts(updated);
    }
  }

  function handleReset() {
    if (confirm('Deseja restaurar o catálogo padrão da Sul Ótica?')) {
      const updated = resetCatalogToDefault();
      setAllProducts(updated);
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
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-accent hover:shadow-lg transition duration-200"
          >
            <PlusCircle size={15} /> Adicionar Modelo
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.slice(0, limit).map((p) => (
          <div key={p.id} className="relative group/card">
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
