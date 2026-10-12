import React from 'react';

interface FooterProps {
  onOpenMarketingKit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMarketingKit }) => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        
        <div>
          <span className="font-semibold text-zinc-950 block mb-0.5">AGROVET Digital</span>
          <span className="text-[11px] text-zinc-400">Despacho oficial de insumos agropecuarios garantizados.</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenMarketingKit} 
            className="hover:text-zinc-950 transition-colors cursor-pointer"
          >
            Panel de Marketing
          </button>
          <span>Envíos a todo el país</span>
          <span>Pago Contraentrega</span>
        </div>

      </div>
    </footer>
  );
};
