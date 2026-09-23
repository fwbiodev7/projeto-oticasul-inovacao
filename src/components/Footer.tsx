import Link from 'next/link';
import { Instagram, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return <footer className="bg-primary text-white">
    <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Logo light /><p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Tradição em cuidar do seu olhar desde 2000. Uma nova forma de descobrir o óculos que combina com você.</p><span className="mt-5 inline-flex rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/80">Sua Cidade · Minas Gerais</span></div>
      <div><h3 className="mb-5 text-sm font-bold uppercase tracking-[.2em] text-accent">Explore</h3><div className="grid gap-3 text-sm text-white/70"><Link href="/catalogo" className="hover:text-white">Catálogo</Link><Link href="/visagismo" className="hover:text-white">Visagismo IA</Link><Link href="/sobre" className="hover:text-white">Nossa história</Link><Link href="/contato" className="hover:text-white">Contato</Link></div></div>
      <div><h3 className="mb-5 text-sm font-bold uppercase tracking-[.2em] text-accent">Visite a loja</h3><div className="space-y-4 text-sm leading-6 text-white/70"><p className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-accent" />R. Alves e Silva, 61<br />Centro, Sua Cidade/MG · CEP 37002-190</p><a href="tel:+5535998892492" className="flex items-center gap-3 hover:text-white"><Phone size={18} className="text-accent" />(35) 99889-2492</a><a href="https://www.instagram.com/oticafabio/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white"><Instagram size={18} className="text-accent" />@oticafabio</a><p>Segunda a sexta até às 18:00.</p></div></div>
    </div>
    <div className="border-t border-white/10"><div className="container-wide flex flex-col justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row"><span>© {new Date().getFullYear()} Ótica Fábio. Protótipo demonstrativo.</span><span>Produtos e preços ilustrativos. A análise por IA oferece sugestões de estilo.</span></div></div>
  </footer>;
}
