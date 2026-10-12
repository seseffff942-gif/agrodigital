import React, { useMemo } from 'react';
import { Producto } from '../types';
import { ProductCard } from './ProductCard';
import { Search, RotateCcw } from 'lucide-react';

interface CatalogProps {
  productos: Producto[];
  deletedCount?: number;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddToCart: (p: Producto) => void;
  onQuickView: (p: Producto) => void;
  onDeleteProduct: (id: string | number) => void;
  onRestoreProducts?: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  productos,
  deletedCount = 0,
  selectedCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  onAddToCart,
  onQuickView,
  onDeleteProduct,
  onRestoreProducts
}) => {
  const categories = useMemo(() => {
    const set = new Set<string>();
    productos.forEach(p => {
      if (p.Categoría) set.add(p.Categoría);
    });
    return ['Todos', ...Array.from(set)];
  }, [productos]);

  const filteredProducts = useMemo(() => {
    return productos.filter(p => {
      const matchCat = selectedCategory === 'Todos' || p.Categoría === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchSearch = !term ||
        p.Nombre.toLowerCase().includes(term) ||
        String(p.Identificación).toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [productos, selectedCategory, searchTerm]);

  return (
    <section id="catalogo" className="max-w-6xl mx-auto px-6 py-14">
      
      {/* Catalog controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium tracking-tight text-zinc-950">
              Catálogo de Fórmulas
            </h2>
            {deletedCount > 0 && onRestoreProducts && (
              <button
                onClick={onRestoreProducts}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] text-zinc-500 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer"
                title="Restaurar productos eliminados"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar {deletedCount} eliminados</span>
              </button>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            {filteredProducts.length} insumos listos para despacho
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Categories minimal line */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-zinc-100">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs transition-colors whitespace-nowrap cursor-pointer ${
                active 
                  ? 'bg-zinc-950 text-white font-medium' 
                  : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-xs text-zinc-400">
          No se encontraron productos coincidentes en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard
              key={String(p.Identificación)}
              producto={p}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onDeleteProduct={onDeleteProduct}
            />
          ))}
        </div>
      )}

    </section>
  );
};
