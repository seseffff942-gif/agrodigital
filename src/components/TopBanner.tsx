import React from 'react';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

export const TopBanner: React.FC = () => {
  return (
    <div className="bg-zinc-950 text-white text-[11px] font-medium py-2 px-4 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
        <div className="inline-flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span><strong className="text-white">Pago Contraentrega:</strong> Pagas en efectivo al recibir en tu puerta</span>
        </div>
        <span className="hidden sm:inline text-zinc-600">|</span>
        <div className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="text-zinc-300">Envíos a fincas y municipios en 24-48 hrs</span>
        </div>
        <span className="hidden md:inline text-zinc-600">|</span>
        <div className="inline-flex items-center gap-1.5 text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Fórmulas con registro oficial garantizado</span>
        </div>
      </div>
    </div>
  );
};
