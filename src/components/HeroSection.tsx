import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin, ScanFace, Glasses } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function HeroSection() {
  const { campaign, contact } = siteConfig;
  return <section className="container-wide hero-section">
    <div className="hero-copy">
      <span className="eyebrow"><span className="status-dot" />{campaign.label}</span>
      <h1 className="hero-title">{campaign.title}<br /><em>{campaign.emphasis}</em></h1>
      <p className="hero-description">{campaign.description}</p>
      <div className="hero-actions"><Link href="/catalogo" className="btn-primary">Encontre seus óculos <ArrowUpRight size={18} /></Link><Link href="/visagismo" className="hero-style-link"><ScanFace size={18} />Descubra seu estilo</Link></div>
      <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hero-address"><span><MapPin size={20} strokeWidth={1.6} /></span><span><strong>Pertinho de você.</strong><small>{contact.street} · Centro</small></span><ArrowUpRight size={17} /></a>
    </div>
    <div className="hero-visual">
      <div className="hero-photo"><Image src={campaign.image} alt={campaign.imageAlt} fill preload sizes="(max-width: 767px) 100vw, 52vw" className="object-cover object-[68%_center]" /><div className="hero-photo-shade" /><div className="hero-caption"><span>SEU ESTILO. SEU JEITO DE VER.</span><p>{campaign.caption}</p></div></div>
      <div className="hero-stamp" aria-hidden="true"><svg viewBox="0 0 120 120"><defs><path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#stamp-circle" textLength="273">SUL ÓTICA · UM NOVO OLHAR · VARGINHA · </textPath></text></svg><Glasses size={38} strokeWidth={1.4} /></div>
      <span className="hero-image-label">UM CONVITE A SE REDESCOBRIR <ArrowUpRight size={15} /></span>
    </div>
  </section>;
}
