import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/lib/mock-data';

export function WhatsAppButton({ message, children, className = '', outline = false }: { message?: string; children?: React.ReactNode; className?: string; outline?: boolean }) {
  return <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={(outline ? 'btn-outline' : 'btn-primary') + ' ' + className}>
    <MessageCircle size={18} strokeWidth={2.2} />{children || 'Falar no WhatsApp'}<ArrowUpRight size={17} />
  </a>;
}
