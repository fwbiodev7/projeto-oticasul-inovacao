import type { FrameShape, ProductCategory } from '@/types';

export function CategoryFilter({ category, shape, onCategory, onShape }: { category: ProductCategory | 'Todos'; shape: FrameShape | 'Todos'; onCategory: (v: ProductCategory | 'Todos') => void; onShape: (v: FrameShape | 'Todos') => void }) {
  const categories: Array<ProductCategory | 'Todos'> = ['Todos', 'Grau', 'Sol'];
  const shapes: Array<FrameShape | 'Todos'> = ['Todos', 'Redondo', 'Gatinho', 'Aviador', 'Retangular'];
  return <div className="flex flex-col justify-between gap-5 rounded-2xl border border-primary/10 bg-white p-4 sm:flex-row sm:items-center sm:p-5">
    <div className="flex flex-wrap gap-2" aria-label="Filtrar por tipo">{categories.map(item => <button key={item} type="button" onClick={() => onCategory(item)} aria-pressed={category === item} className={'rounded-full px-4 py-2 text-xs font-bold transition ' + (category === item ? 'bg-primary text-white' : 'bg-light text-primary/70 hover:bg-accent/10')}>{item === 'Todos' ? 'Todos os óculos' : `Óculos de ${item.toLowerCase()}`}</button>)}</div>
    <label className="flex items-center gap-3 whitespace-nowrap text-xs font-semibold text-primary/60">Formato <select aria-label="Filtrar por formato" value={shape} onChange={e => onShape(e.target.value as FrameShape | 'Todos')} className="rounded-full border border-primary/10 bg-white px-4 py-2.5 font-semibold text-primary outline-none focus:border-accent">{shapes.map(item => <option key={item} value={item}>{item === 'Todos' ? 'Todos os estilos' : item}</option>)}</select></label>
  </div>;
}
