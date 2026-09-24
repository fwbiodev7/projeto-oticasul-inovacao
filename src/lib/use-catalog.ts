'use client';
import { useSyncExternalStore } from 'react';
import { products } from './mock-data';
import { CATALOG_CHANGE_EVENT, CATALOG_STORAGE_KEY, loadCatalog } from './catalog-storage';
let previous: string | null | undefined;
let snapshot = products;
function getSnapshot() {
  try {
    const raw = localStorage.getItem(CATALOG_STORAGE_KEY) ?? localStorage.getItem('oticafabio_custom_products');
    if (raw !== previous) { previous = raw; snapshot = loadCatalog(); }
  } catch { snapshot = products; }
  return snapshot;
}
function subscribe(notify: () => void) {
  window.addEventListener(CATALOG_CHANGE_EVENT, notify);
  window.addEventListener('storage', notify);
  return () => { window.removeEventListener(CATALOG_CHANGE_EVENT, notify); window.removeEventListener('storage', notify); };
}
export function useCatalog() { return useSyncExternalStore(subscribe, getSnapshot, () => products); }
