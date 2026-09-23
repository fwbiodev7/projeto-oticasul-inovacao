import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: 'Sul Ótica | Seu olhar, seu estilo', template: '%s | Sul Ótica' },
  description: 'Sul Ótica em Varginha desde 1980. Explore armações e experimente uma nova forma de descobrir seu estilo com visagismo por IA.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body><Header /><main>{children}</main><Footer /></body></html>;
}
