import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Link href="/" aria-label={siteConfig.name + ', ir para início'} className={'brand-logo ' + (light ? 'text-white' : 'text-primary')}>
    <svg aria-hidden="true" viewBox="0 0 64 44" className={compact ? 'h-10 w-14' : 'h-12 w-16'} fill="none">
      <path d="M4 19L8 9H22M60 19L56 9H42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="3" y="16" width="23" height="20" rx="8" stroke="currentColor" strokeWidth="3.5" />
      <rect x="38" y="16" width="23" height="20" rx="8" stroke="currentColor" strokeWidth="3.5" />
      <path d="M26 23Q32 18 38 23" stroke="currentColor" strokeWidth="3.5" />
    </svg>
    <span><span className="logo-wordmark">sul<span className={light ? 'text-highlight' : 'text-accent'}>ótica</span><span className="logo-dot">.</span></span><span className="logo-location">VARGINHA · MINAS GERAIS</span></span>
  </Link>;
}
