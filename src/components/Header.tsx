'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { WhatsAppButton } from './WhatsAppButton';

const nav = [['Início', '/'], ['Catálogo', '/catalogo'], ['Visagismo IA', '/visagismo'], ['Sobre nós', '/sobre'], ['Contato', '/contato']];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-primary/5 bg-white/95 backdrop-blur-xl">
    <div className="bg-primary text-white/85">
      <div className="container-wide flex h-9 items-center justify-between text-[11px] font-medium tracking-wide sm:text-xs">
        <span className="flex items-center gap-2"><MapPin size={13} className="text-accent" />Praça Quintino Bocaiuva, 61 · Centro · Varginha/MG</span>
        <a className="hidden items-center gap-2 hover:text-white sm:flex" href="tel:+553532216531"><Phone size={13} className="text-accent" />(35) 3221-6531</a>
      </div>
    </div>
    <div className="container-wide flex h-[78px] items-center justify-between gap-6">
      <Logo compact />
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
        {nav.map(([label, href]) => <Link key={href} href={href} className={'nav-link ' + (path === href ? 'text-accent' : '')}>{label}</Link>)}
      </nav>
      <div className="hidden xl:block"><WhatsAppButton className="!px-5 !py-3 text-sm">Atendimento</WhatsAppButton></div>
      <button type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-lg border border-primary/10 p-2 text-primary lg:hidden">{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    {open && <nav aria-label="Navegação móvel" className="border-t border-primary/10 bg-white px-5 py-4 shadow-soft lg:hidden">
      {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={'block rounded-lg px-3 py-3 text-sm font-semibold ' + (path === href ? 'bg-light text-accent' : 'text-primary')}>{label}</Link>)}
      <WhatsAppButton className="mt-3 w-full justify-center">Atendimento</WhatsAppButton>
    </nav>}
  </header>;
}
