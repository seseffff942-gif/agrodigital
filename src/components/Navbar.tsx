import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onNavigate('catalogo')}
          className="cursor-pointer flex items-center gap-2"
        >
          <span className="font-semibold text-lg tracking-tight text-zinc-950">
            AGROVET
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400">
            / Digital
          </span>
        </div>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <button 
            onClick={() => onNavigate('catalogo')}
            className="hover:text-zinc-950 transition-colors cursor-pointer"
          >
            Productos
          </button>
          <button 
            onClick={() => onNavigate('como-funciona')}
            className="hover:text-zinc-950 transition-colors cursor-pointer"
          >
            Envíos
          </button>
          <button 
            onClick={() => onNavigate('garantia')}
            className="hover:text-zinc-950 transition-colors cursor-pointer"
          >
            Garantía
          </button>
        </nav>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-200 hover:border-zinc-950 text-zinc-900 text-xs font-medium transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bolsa</span>
          {cartCount > 0 && (
            <span className="bg-zinc-950 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
              {cartCount}
            </span>
          )}
        </button>

      </div>
    </header>
  );
};
