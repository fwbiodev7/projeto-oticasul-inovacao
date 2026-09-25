/** Dados da loja fornecidos na referência. Horários completos ainda não informados. */
export const siteConfig = {
  name: 'Sul Ótica',
  description: 'Sul Ótica em Varginha, MG. Conheça nossa vitrine de óculos de grau e de sol e encontre seu estilo. Rua Alves e Silva, 61, Centro. (35) 99889-2492.',
  collectionName: 'Coleção Sul',
  announcement: 'Seu novo olhar tem endereço. Centro de Varginha, MG.',
  campaign: {
    label: 'SUL ÓTICA · VARGINHA, MG',
    title: 'Veja a vida',
    emphasis: 'com outros olhos.',
    description: 'Novos estilos, novas possibilidades. Encontre os óculos que combinam com você e venha experimentar de perto, aqui no Centro de Varginha.',
    image: '/images/hero-editorial.png',
    imageAlt: 'Mulher com óculos de armação dourada em uma composição editorial',
    caption: 'Um olhar que é só seu.',
  },
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5535998892492',
    phoneLabel: '(35) 99889-2492',
    phoneHref: 'tel:+5535998892492',
    address: 'Rua Alves e Silva, 61 — Centro, Varginha - MG',
    street: 'Rua Alves e Silva, 61',
    city: 'Centro · Varginha, MG',
    postalCode: '37002-190',
    hours: 'Consulte o horário de atendimento pelo WhatsApp.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Sul Ótica, Rua Alves e Silva, 61, Centro, Varginha, MG, 37002-190'),
    instagramUrl: '',
    instagramLabel: '',
  },
};
