import { products as defaultProducts } from '@/lib/mock-data';
import type { Product } from '@/types';

export const CATALOG_STORAGE_KEY = 'oticafabio_catalog_v1';
export const CATALOG_CHANGE_EVENT = 'oticafabio_catalog_changed';

/**
 * Carrega todos os produtos salvos no navegador.
 * Se ainda não houver customização, retorna a lista inicial padrão.
 */
export function loadCatalog(): Product[] {
  if (typeof window === 'undefined') return defaultProducts;
  try {
    const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }

    // Suporte retroativo ao formato antigo 'oticafabio_custom_products'
    const legacy = localStorage.getItem('oticafabio_custom_products');
    if (legacy) {
      const legacyParsed = JSON.parse(legacy);
      if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
        const merged = [...legacyParsed, ...defaultProducts];
        saveCatalog(merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn('Erro ao carregar catálogo do armazenamento:', e);
  }
  return defaultProducts;
}

/**
 * Salva a lista completa de produtos no armazenamento local e notifica os componentes.
 */
export function saveCatalog(items: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(CATALOG_CHANGE_EVENT, { detail: items }));
  } catch (e) {
    console.error('Erro ao salvar catálogo no localStorage:', e);
  }
}

/**
 * Adiciona uma nova armação ao catálogo (no topo).
 */
export function addCatalogProduct(newProduct: Product): Product[] {
  const current = loadCatalog();
  const updated = [newProduct, ...current];
  saveCatalog(updated);
  return updated;
}

/**
 * Atualiza os dados de uma armação existente por ID.
 */
export function updateCatalogProduct(updatedProduct: Product): Product[] {
  const current = loadCatalog();
  const updated = current.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
  saveCatalog(updated);
  return updated;
}

/**
 * Remove uma armação do catálogo por ID.
 */
export function deleteCatalogProduct(id: string): Product[] {
  const current = loadCatalog();
  const updated = current.filter(p => p.id !== id);
  saveCatalog(updated);
  return updated;
}

/**
 * Restaura o catálogo para os modelos originais de fábrica.
 */
export function resetCatalogToDefault(): Product[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CATALOG_STORAGE_KEY);
    localStorage.removeItem('oticafabio_custom_products');
  }
  saveCatalog(defaultProducts);
  return defaultProducts;
}

/**
 * Exporta o catálogo em formato JSON para backup.
 */
export function exportCatalogJson(): string {
  const items = loadCatalog();
  return JSON.stringify(items, null, 2);
}

/**
 * Importa um catálogo a partir de texto JSON (backup).
 */
export function importCatalogJson(jsonText: string): Product[] {
  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed)) {
    throw new Error('O formato do arquivo de backup é inválido (deve ser uma lista de produtos).');
  }
  saveCatalog(parsed);
  return parsed;
}
