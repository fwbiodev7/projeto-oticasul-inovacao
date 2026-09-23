import type { Product } from '@/types';

export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '553532216531'; // Telefone público; confirmar habilitação no WhatsApp antes de publicar.
export const whatsappUrl = (message = 'Olá! Vim pelo site da Sul Ótica e gostaria de atendimento.') =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const products: Product[] = [
  { id: '01', name: 'Aurora Champagne', brand: 'Coleção Sul', price: 329, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Leve', 'Acetato'], color: 'Champagne' },
  { id: '02', name: 'Luna Black', brand: 'Coleção Sul', price: 389, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Elegante', 'Proteção UV'], color: 'Preto' },
  { id: '03', name: 'Solaris Gold', brand: 'Coleção Sul', price: 419, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Clássico', 'Metal'], color: 'Dourado' },
  { id: '04', name: 'Clara Nude', brand: 'Coleção Sul', price: 349, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Minimalista', 'Leve'], color: 'Nude' },
  { id: '05', name: 'Íris Noir', brand: 'Coleção Sul', price: 399, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Feminino', 'Marcante'], color: 'Preto' },
  { id: '06', name: 'Horizonte Metal', brand: 'Coleção Sul', price: 449, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Leve', 'Metal'], color: 'Dourado' },
  { id: '07', name: 'Brisa Cristal', brand: 'Coleção Sul', price: 359, image: '/images/frame-champagne.png', category: 'Grau', frameShape: 'Redondo', tags: ['Contemporâneo', 'Leve'], color: 'Cristal' },
  { id: '08', name: 'Siena Cat', brand: 'Coleção Sul', price: 379, image: '/images/frame-cat-eye.png', category: 'Sol', frameShape: 'Gatinho', tags: ['Sofisticado', 'UV'], color: 'Ônix' },
  { id: '09', name: 'Atlas Classic', brand: 'Coleção Sul', price: 429, image: '/images/frame-aviator.png', category: 'Sol', frameShape: 'Aviador', tags: ['Atemporal', 'UV'], color: 'Ouro' },
  { id: '10', name: 'Nina Light', brand: 'Coleção Sul', price: 339, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Discreto', 'Acetato'], color: 'Azul marinho' },
  { id: '11', name: 'Maya Bold', brand: 'Coleção Sul', price: 409, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Marcante', 'Acetato'], color: 'Azul marinho' },
  { id: '12', name: 'Douro Urban', brand: 'Coleção Sul', price: 459, image: '/images/frame-rectangular.png', category: 'Grau', frameShape: 'Retangular', tags: ['Urbano', 'Acetato'], color: 'Azul marinho' },
];
