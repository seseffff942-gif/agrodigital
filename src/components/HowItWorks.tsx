import React from 'react';

interface HowItWorksProps {
  onStartOrder: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartOrder }) => {
  return (
    <section id="como-funciona" className="py-20 px-6 max-w-4xl mx-auto border-t border-zinc-100">
      
      <div className="mb-12">
        <h2 className="text-xl font-medium tracking-tight text-zinc-950 mb-2">
          Cómo se procesan los despachos
        </h2>
        <p className="text-xs text-zinc-500">
          Operación directa desde el centro de distribución en Petén y Ciudad de Guatemala.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400">01</span>
          <h3 className="text-sm font-medium text-zinc-900">Selección de insumos</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Elige los medicamentos o fórmulas necesarias desde el catálogo digital con disponibilidad confirmada.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400">02</span>
          <h3 className="text-sm font-medium text-zinc-900">Embalaje y logística</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            La orden es empacada en la bodega central de Agricovet bajo condiciones adecuadas de temperatura y resguardo.
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400">03</span>
          <h3 className="text-sm font-medium text-zinc-900">Entrega y cobro</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            El transporte entrega en tu finca o municipio en 24-48 horas. Verificas tu pedido y pagas contraentrega.
          </p>
        </div>

      </div>

      {/* Guarantee simple callout */}
      <div id="garantia" className="mt-16 p-6 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-medium text-zinc-900">
            Garantía Sanitaria y de Origen
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            Todos los productos cuentan con registro sanitario vigente y trazabilidad directa de laboratorio.
          </p>
        </div>

        <button
          onClick={onStartOrder}
          className="px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-medium shrink-0 cursor-pointer hover:bg-zinc-800 transition-colors"
        >
          Ir al Catálogo
        </button>
      </div>

    </section>
  );
};
