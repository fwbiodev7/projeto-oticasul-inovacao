'use client';
import { useSyncExternalStore } from 'react';
// Apenas conveniência para a demonstração local; não é autenticação de servidor.
const key = 'oticafabio_adm_auth';
const eventName = 'inovacao-demo-session';
let memory = false;
function snapshot() { try { return sessionStorage.getItem(key) === 'true'; } catch { return memory; } }
function subscribe(notify: () => void) { window.addEventListener(eventName, notify); return () => window.removeEventListener(eventName, notify); }
export function setDemoSession(value: boolean) {
  memory = value;
  try { if (value) sessionStorage.setItem(key, 'true'); else sessionStorage.removeItem(key); } catch { /* Armazenamento indisponível: sessão somente em memória. */ }
  window.dispatchEvent(new Event(eventName));
}
export function useDemoSession() { return useSyncExternalStore(subscribe, snapshot, () => false); }
