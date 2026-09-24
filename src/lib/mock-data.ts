import type { Product } from '@/types';
import { siteConfig } from './site-config';

export const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, '');
export const whatsappUrl = (message = `Olá! Vim pelo site da ${siteConfig.name} e gostaria de atendimento.`) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const products: Product[] = [
  { id: '01', name: 'Aurora Champagne', brand: 'Coleção Fábio', price: 329, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Leve', 'Acetato'], color: 'Champagne' },
  { id: '02', name: 'Luna Black', brand: 'Coleção Fábio', price: 389, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Elegante', 'Proteção UV'], color: 'Preto' },
  { id: '03', name: 'Solaris Gold', brand: 'Coleção Fábio', price: 419, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Clássico', 'Metal'], color: 'Dourado' },
  { id: '04', name: 'Clara Nude', brand: 'Coleção Fábio', price: 349, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Minimalista', 'Leve'], color: 'Nude' },
  { id: '05', name: 'Íris Noir', brand: 'Coleção Fábio', price: 399, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Feminino', 'Marcante'], color: 'Preto' },
  { id: '06', name: 'Horizonte Metal', brand: 'Coleção Fábio', price: 449, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Leve', 'Metal'], color: 'Dourado' },
  { id: '07', name: 'Brisa Cristal', brand: 'Coleção Fábio', price: 359, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Contemporâneo', 'Leve'], color: 'Cristal' },
  { id: '08', name: 'Siena Cat', brand: 'Coleção Fábio', price: 379, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Sofisticado', 'UV'], color: 'Ônix' },
  { id: '09', name: 'Atlas Classic', brand: 'Coleção Fábio', price: 429, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Atemporal', 'UV'], color: 'Ouro' },
  { id: '10', name: 'Nina Light', brand: 'Coleção Fábio', price: 339, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Discreto', 'Acetato'], color: 'Azul marinho' },
  { id: '11', name: 'Maya Bold', brand: 'Coleção Fábio', price: 409, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Marcante', 'Acetato'], color: 'Azul marinho' },
  { id: '12', name: 'Douro Urban', brand: 'Coleção Fábio', price: 459, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Urbano', 'Acetato'], color: 'Azul marinho' },
  { id: '13', name: 'Vargas Havana', brand: 'Coleção Fábio', price: 389, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Elegante', 'Acetato Nobre'], color: 'Havana Tartaruga' },
  { id: '14', name: 'Elegance Rosé', brand: 'Coleção Fábio', price: 429, image: '/images/frame-cat-eye.png', category: 'Grau', frameShape: 'Gatinho', tags: ['Feminino', 'Leveza'], color: 'Rosé Cristal' },
  { id: '15', name: 'Minas Aviator', brand: 'Coleção Fábio', price: 469, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Polarizado', 'Titânio'], color: 'Grafite Fosco' },
  { id: '16', name: 'Rio Branco Slim', brand: 'Coleção Fábio', price: 369, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Minimalista', 'Aço Nobre'], color: 'Prata Escovado' },
  { id: '17', name: 'Sunset Âmbar', brand: 'Coleção Fábio', price: 419, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Sofisticado', 'Proteção UV400'], color: 'Âmbar Degradê' },
  { id: '18', name: 'Caparaó Black', brand: 'Coleção Fábio', price: 449, image: '/images/frame-rectangular.png', category: 'Sol', frameShape: 'Retangular', tags: ['Urbano', 'Polarizado'], color: 'Preto Fosco' },
];
