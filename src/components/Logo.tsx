import Link from 'next/link';

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <Link href="/" aria-label="Sul Ótica, ir para início" className="inline-flex shrink-0 items-center gap-3">
    <svg aria-hidden="true" viewBox="0 0 82 46" className={compact ? 'h-8 w-14' : 'h-10 w-[72px]'} fill="none">
      <path d="M18 23C25 7 37 7 41 23C45 39 57 39 64 23C57 7 45 7 41 23C37 39 25 39 18 23Z" stroke="#18A9E5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 23h6m64 0h6" stroke="#18A9E5" strokeWidth="8" strokeLinecap="round" />
    </svg>
    <span className="flex flex-col leading-none">
      <span className="font-black italic tracking-[-.075em] text-[30px] sm:text-[34px]"><span className="text-accent">sul</span><span className={light ? 'text-white' : 'text-primary'}>ótica</span></span>
      <span className={'mt-1 flex items-center gap-2 text-[10px] font-medium italic tracking-[.12em] ' + (light ? 'text-white/80' : 'text-primary/70')}><i className="h-px w-5 bg-accent" />Desde 1980<i className="h-px w-5 bg-accent" /></span>
    </span>
  </Link>;
}
