'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Plus, X, Upload, Check, Sparkles, Edit3 } from 'lucide-react';
import type { FrameShape, Product, ProductCategory } from '@/types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  productToEdit?: Product | null;
}

const TEMPLATE_IMAGES = [
  { label: 'Redondo (Champagne)', path: '/images/frame-champagne.png', defaultShape: 'Redondo' },
  { label: 'Gatinho (Preto / Sofisticado)', path: '/images/frame-cat-eye.png', defaultShape: 'Gatinho' },
  { label: 'Aviador (Dourado / Metal)', path: '/images/frame-aviator.png', defaultShape: 'Aviador' },
  { label: 'Retangular (Urbano)', path: '/images/frame-rectangular.png', defaultShape: 'Retangular' },
];

export function AddProductModal({ isOpen, onClose, onAddProduct, productToEdit }: AddProductModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Coleção Fábio');
  const [price, setPrice] = useState('399');
  const [category, setCategory] = useState<ProductCategory>('Grau');
  const [frameShape, setFrameShape] = useState<FrameShape>('Redondo');
  const [color, setColor] = useState('');
  const [tags, setTags] = useState('Acetato, Leve');
  const [image, setImage] = useState(TEMPLATE_IMAGES[0].path);
  const [imageCustom, setImageCustom] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setBrand(productToEdit.brand || 'Coleção Fábio');
      setPrice(productToEdit.price.toString());
      setCategory(productToEdit.category);
      setFrameShape(productToEdit.frameShape);
      setColor(productToEdit.color || '');
      setTags(productToEdit.tags?.join(', ') || '');
      setImage(productToEdit.image || TEMPLATE_IMAGES[0].path);
      setImageCustom(productToEdit.image?.startsWith('data:') ? productToEdit.image : null);
    } else {
      resetForm();
    }
  }, [productToEdit, isOpen]);

  function resetForm() {
    setName('');
    setBrand('Coleção Fábio');
    setPrice('399');
    setCategory('Grau');
    setFrameShape('Redondo');
    setColor('');
    setTags('Acetato, Leve');
    setImage(TEMPLATE_IMAGES[0].path);
    setImageCustom(null);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  if (!isOpen) return null;

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageCustom(reader.result);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const productData: Product = {
      id: productToEdit ? productToEdit.id : 'custom-' + Date.now().toString().slice(-6),
      name: name.trim(),
      brand: brand.trim() || 'Coleção Fábio',
      price: parseFloat(price) || 350,
      image,
      category,
      frameShape,
      color: color.trim() || 'Padrão',
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    };

    onAddProduct(productData);
    resetForm();
    onClose();
  }

  const isEditing = Boolean(productToEdit);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-primary/10 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5 bg-gradient-to-r from-light to-white">
          <div className="flex items-center gap-2 text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
              {isEditing ? <Edit3 size={19} /> : <Plus size={20} />}
            </span>
            <div>
              <h2 className="text-lg font-bold text-primary">
                {isEditing ? 'Editar Armação' : 'Adicionar Nova Armação'}
              </h2>
              <p className="text-xs text-ink/60">
                {isEditing
                  ? `Atualizando informações de "${productToEdit?.name}"`
                  : 'Cadastre um modelo para exibir no catálogo da loja'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-full p-2 text-ink/40 hover:bg-light hover:text-ink transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
              Nome do Modelo *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: Milano Havana, Óculos Capri..."
              className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Marca / Coleção
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Ex: Coleção Fábio, Ray-Ban..."
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Tipo
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ProductCategory)}
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              >
                <option value="Grau">Grau</option>
                <option value="Sol">Sol</option>
                <option value="Multifocal">Multifocal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Formato do Rosto
              </label>
              <select
                value={frameShape}
                onChange={e => setFrameShape(e.target.value as FrameShape)}
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              >
                <option value="Redondo">Redondo</option>
                <option value="Oval">Oval</option>
                <option value="Gatinho">Gatinho</option>
                <option value="Aviador">Aviador</option>
                <option value="Retangular">Retangular</option>
                <option value="Quadrado">Quadrado</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Preço (R$)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="399"
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Cor da Armação
              </label>
              <input
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
                placeholder="Ex: Dourado, Preto..."
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Acetato, Leve, UV"
                className="w-full rounded-xl border border-primary/15 bg-light/40 px-3.5 py-2.5 text-sm font-semibold text-primary outline-none focus:border-accent focus:bg-white transition"
              />
            </div>
          </div>

          {/* Selecionar Foto */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">
              Foto da Armação
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {TEMPLATE_IMAGES.map(tmpl => (
                <button
                  key={tmpl.path}
                  type="button"
                  onClick={() => {
                    setImage(tmpl.path);
                    setImageCustom(null);
                    setFrameShape(tmpl.defaultShape as FrameShape);
                  }}
                  className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                    image === tmpl.path
                      ? 'border-accent ring-2 ring-accent/30 shadow-md'
                      : 'border-primary/10 hover:border-primary/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={tmpl.path} alt={tmpl.label} fill sizes="90px" className="object-cover" />
                  {image === tmpl.path && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/25 bg-light/50 px-4 py-2.5 text-xs font-bold text-primary hover:border-accent hover:bg-accent/5 hover:text-accent transition cursor-pointer">
              <Upload size={14} />
              <span>{imageCustom ? 'Foto personalizada carregada (trocar)' : 'Ou enviar foto do seu computador / celular'}</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="sr-only" />
            </label>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-full border border-primary/15 px-4 py-3 text-sm font-bold text-primary hover:bg-light transition"
            >
              Cancelar
            </button>
            <button type="submit" className="flex-1 btn-primary">
              <Sparkles size={16} /> {isEditing ? 'Salvar Alterações' : 'Cadastrar no Catálogo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
