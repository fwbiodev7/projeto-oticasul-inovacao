import Link from 'next/link';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig } from '@/lib/site-config';
import { whatsappUrl } from '@/lib/mock-data';
export function Footer() {
  const contact = siteConfig.contact;
  return <footer className="bg-primary text-white">
    <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
      <div><Logo light /><p className="mt-6 max-w-xs text-sm leading-7 text-white/60">Novos olhares. Novas possibilidades.<br />Óculos para cada versão de você.</p></div>
      <div><h3 className="mb-6 text-[10px] uppercase tracking-[.2em] text-highlight">Encontre seu caminho</h3><div className="grid gap-3 text-xs text-white/65"><Link href="/catalogo">Nossos óculos</Link><Link href="/visagismo">Descubra seu estilo</Link><Link href="/sobre">Sobre nós</Link><Link href="/contato">Fale com a gente</Link></div></div>
      <div><h3 className="mb-6 text-[10px] uppercase tracking-[.2em] text-highlight">Vamos conversar</h3><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-b border-white/30 pb-3 text-lg">{contact.phoneLabel}<ArrowUpRight size={20} /></a>{contact.address && <p className="mt-4 text-xs text-white/60">{contact.address}</p>}{contact.hours && <p className="mt-3 text-xs text-white/60">{contact.hours}</p>}{contact.instagramUrl && <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex gap-2 text-sm"><Instagram size={16} />{contact.instagramLabel}</a>}</div>
    </div>
    <div className="container-wide"><div className="flex flex-col justify-between gap-3 border-t border-white/15 py-6 text-[10px] text-white/45 sm:flex-row"><span>© {new Date().getFullYear()} {siteConfig.name}.</span><span>Feito para ver além do óbvio.</span><span>Vitrine demonstrativa · Imagens e preços ilustrativos</span></div></div>
  </footer>;
}
