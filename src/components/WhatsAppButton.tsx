import { MessageCircle } from 'lucide-react';
import { tracking } from '@/lib/tracking';

export function WhatsAppButton() {
  const handleClick = () => {
    tracking.clickChat('whatsapp');
    window.open(
      'https://wa.me/5511999999999?text=Olá! Gostaria de ajuda com cotação de frete.',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="whatsapp-float"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
