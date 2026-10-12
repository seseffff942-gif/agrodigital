import React, { useState } from 'react';
import { Producto } from '../types';
import { Plus, Check, Trash2, Truck } from 'lucide-react';

interface ProductCardProps {
  producto: Producto;
  onAddToCart: (producto: Producto) => void;
  onQuickView: (producto: Producto) => void;
  onDeleteProduct?: (id: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  producto,
  onAddToCart,
  onQuickView,
  onDeleteProduct
}) => {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(producto);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Seguro que deseas eliminar "${producto.Nombre}" de tu catálogo?`)) {
      onDeleteProduct?.(producto.Identificación);
    }
  };

  const imgUrl = producto.imagen_url || producto.Imagen || '/placeholder-bottle.webp';
  const price = producto.Precio && producto.Precio !== 'Consultar' && producto.Precio !== '0.00'
    ? `Q ${producto.Precio}`
    : 'A cotizar';

  return (
    <div 
      onClick={() => onQuickView(producto)}
      className="group relative bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-950 transition-all cursor-pointer"
    >
      
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-zinc-50 rounded-lg p-6 mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={imgUrl}
          alt={producto.Nombre}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-bottle.webp';
          }}
          className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
        />
        
        <span className="absolute top-2 left-2 text-[9px] uppercase font-mono tracking-wider text-zinc-500 bg-white/90 px-1.5 py-0.5 rounded border border-zinc-100">
          {producto.Categoría || 'General'}
        </span>

        {/* Delete Product Button */}
        {onDeleteProduct && (
          <button
            onClick={handleDelete}
            title="Eliminar este producto de mi tienda"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-red-50 text-zinc-400 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-zinc-200 hover:border-red-200 shadow-xs cursor-pointer z-10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Product Meta */}
      <div>
        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mb-1">
          <span>REF #{producto.Identificación}</span>
          <span className="text-emerald-700 font-sans font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Disponible
          </span>
        </div>
        <h3 className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1 mb-1">
          {producto.Nombre}
        </h3>
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
          {producto.Descripción || 'Insumo garantizado con registro sanitario oficial.'}
        </p>
      </div>

      {/* Footer Price & Add */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-zinc-950 block">
            {price}
          </span>
          <span className="text-[10px] text-zinc-400 block -mt-0.5">
            Pago al recibir
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`h-7 px-2.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
            added 
              ? 'bg-zinc-950 text-white' 
              : 'border border-zinc-200 hover:border-zinc-950 text-zinc-800'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3 h-3" />
              <span>Agregado</span>
            </>
          ) : (
            <>
              <Plus className="w-3 h-3" />
              <span>Añadir</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
