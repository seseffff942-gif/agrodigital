import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const phone = '50254743595';
    const msg = encodeURIComponent('¡Hola Agrovet! 👋 Necesito consultar la disponibilidad y envío de un insumo para mi finca.');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={handleOpenWhatsApp}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-950/20 hover:shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Consultar por WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-white stroke-none" />
        <span className="hidden sm:inline">¿Dudas de dosificación o envío?</span>
        <span>WhatsApp</span>
      </button>
    </div>
  );
};
