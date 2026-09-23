import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'Ótica Fábio | Seu olhar, seu estilo', template: '%s | Ótica Fábio' },
  description: 'Ótica Fábio em Sua Cidade desde 2000. Explore armações e experimente uma nova forma de descobrir seu estilo com visagismo por IA.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body><Header /><main>{children}</main><Footer /></body></html>;
}
