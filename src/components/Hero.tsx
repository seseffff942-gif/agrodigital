import React from 'react';
import { ArrowRight, SlidersHorizontal, ShieldCheck, Truck, Banknote } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenMarketingKit: () => void;
  onSelectQuickCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExplore, 
  onOpenMarketingKit,
  onSelectQuickCategory 
}) => {
  const quickSpecies = [
    { label: "Bovinos / Ganado", tag: "Línea Propia" },
    { label: "Antiparasitarios", tag: "Antiparasitarios" },
    { label: "Antibióticos", tag: "Antibióticos" },
    { label: "Herbicidas & Agro", tag: "Herbicidas" },
    { label: "Vitaminas & Minerales", tag: "Vitaminas y Minerales" }
  ];

  return (
    <section className="pt-14 pb-12 px-6 max-w-4xl mx-auto text-center border-b border-zinc-100">
      
      {/* 3-second trust badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 text-[11px] font-medium mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
        <span>Despacho directo a tu finca con entrega en mano</span>
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-5xl font-semibold tracking-tight text-zinc-950 mb-4 leading-tight">
        Insumos veterinarios y agrícolas entregados hasta tu puerta.
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
        Adquiere medicamentos, vitaminas y fertilizantes con garantía de origen. 
        Envíos rápidos a cualquier aldea, municipio o finca de Guatemala con <strong>pago contraentrega</strong>.
      </p>

      {/* Primary actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
        <button
          onClick={onExplore}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          Ver Todos los Insumos Disponibles
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenMarketingKit}
          className="w-full sm:w-auto px-5 py-3 rounded-full border border-zinc-200 hover:border-zinc-400 text-zinc-700 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
          Herramientas de Marketing
        </button>
      </div>

      {/* 5-second Quick Click Targets (One touch to relevant products) */}
      <div className="pt-4 border-t border-zinc-100">
        <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-mono mb-2.5">
          ¿Qué necesitas atender hoy?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {quickSpecies.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQuickCategory(item.tag)}
              className="px-3 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-950 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 mini-benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-zinc-100 text-left">
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50">
          <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-[11px] font-medium text-zinc-700">Pagas en efectivo al recibir</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50">
          <Truck className="w-4 h-4 text-zinc-700 shrink-0" />
          <span className="text-[11px] font-medium text-zinc-700">Cobertura a fincas y municipios</span>
        </div>
        <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-50">
          <ShieldCheck className="w-4 h-4 text-zinc-700 shrink-0" />
          <span className="text-[11px] font-medium text-zinc-700">Sellos y registros originales</span>
        </div>
      </div>

    </section>
  );
};
