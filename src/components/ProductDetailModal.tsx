import React from 'react';
import { X } from 'lucide-react';
import { Producto } from '../types';

interface ProductDetailModalProps {
  producto: Producto | null;
  onClose: () => void;
  onAddToCart: (p: Producto) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  producto,
  onClose,
  onAddToCart
}) => {
  if (!producto) return null;

  const imgUrl = producto.imagen_url || producto.Imagen || '/placeholder-bottle.webp';
  const price = producto.Precio && producto.Precio !== 'Consultar' && producto.Precio !== '0.00'
    ? `Q ${producto.Precio}`
    : 'A cotizar';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/20 backdrop-blur-xs"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-950"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="aspect-square w-full max-w-xs mx-auto bg-zinc-50 rounded-xl p-6 mb-6 flex items-center justify-center">
            <img
              src={imgUrl}
              alt={producto.Nombre}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder-bottle.webp';
              }}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                REF #{producto.Identificación}
              </span>
              <span className="text-[10px] uppercase font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                {producto.Categoría}
              </span>
            </div>

            <h3 className="text-lg font-medium text-zinc-950">
              {producto.Nombre}
            </h3>

            <p className="text-xs text-zinc-500 leading-relaxed">
              {producto.Descripción || 'Producto con control de calidad y registro oficial.'}
            </p>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 block">Precio de Venta</span>
                <span className="text-lg font-semibold text-zinc-950">
                  {price}
                </span>
                <span className="text-[10px] text-emerald-600 block">
                  Envío disponible a todo el país
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(producto);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer transition-colors"
              >
                Añadir a la Bolsa
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
