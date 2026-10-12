import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Producto, CartItem } from './types';
import { PRODUCTOS_AGRICOVET_SEED } from './data/productosAgricovet';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MarketingModal } from './components/MarketingModal';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agrodigital_deleted_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [rawProductos, setRawProductos] = useState<Producto[]>(PRODUCTOS_AGRICOVET_SEED);
  const productos = rawProductos.filter(p => !deletedIds.includes(String(p.Identificación)));

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('agrodigital_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMarketingOpen, setIsMarketingOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('agrodigital_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('agrodigital_deleted_ids', JSON.stringify(deletedIds));
    } catch {}
  }, [deletedIds]);

  const handleDeleteProduct = (id: string | number) => {
    setDeletedIds(prev => [...new Set([...prev, String(id)])]);
  };

  const handleRestoreProducts = () => {
    if (window.confirm('¿Deseas restaurar todos los productos eliminados y volver a ver el catálogo completo?')) {
      setDeletedIds([]);
      try {
        localStorage.removeItem('agrodigital_deleted_ids');
      } catch {}
    }
  };

  useEffect(() => {
    async function syncCatalog() {
      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (!error && data && data.length > 0) {
          const cleanList = data.filter((p: any) => 
            p.Identificación !== 'CONFIG_LOGO' && 
            p.Identificación !== 'CONFIG' &&
            p.Nombre !== 'CONFIG_LOGO'
          );

          if (cleanList.length > 0) {
            const mapped: Producto[] = cleanList.map((p: any) => ({
              Identificación: String(p.Identificación || p.id || Math.random().toString(36).substring(7)),
              Nombre: String(p.Nombre || p.name || 'Producto'),
              Categoría: String(p.Categoría || p.category || 'Otros'),
              Precio: String(p.Precio || p.precio || 'Consultar'),
              Existencias: p.Existencias || '+ Disponible',
              Imagen: p.Imagen || p.imagen_url || '/placeholder-bottle.webp',
              imagen_url: p.imagen_url || p.Imagen || '/placeholder-bottle.webp',
              Descripción: p.Descripción || p.descripcion || ''
            }));
            setRawProductos(mapped);
          }
        }
      } catch (err) {
        console.warn('Usando catálogo local:', err);
      }
    }
    syncCatalog();
  }, []);

  const handleAddToCart = (prod: Producto) => {
    setCart((prev) => {
      const existing = prev.find(item => item.producto.Identificación === prod.Identificación);
      if (existing) {
        return prev.map(item =>
          item.producto.Identificación === prod.Identificación
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto: prod, cantidad: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string | number, delta: number) => {
    setCart((prev) => {
      return prev
        .map(item => {
          if (item.producto.Identificación === id) {
            const newQty = item.cantidad + delta;
            return newQty > 0 ? { ...item, cantidad: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string | number) => {
    setCart(prev => prev.filter(item => item.producto.Identificación !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectQuickCategory = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
    scrollToSection('catalogo');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-['Inter'] selection:bg-zinc-900 selection:text-white">
      
      {/* 5-second Top Confidence Ticker */}
      <TopBanner />

      {/* Minimal Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero
          onExplore={() => scrollToSection('catalogo')}
          onOpenMarketingKit={() => setIsMarketingOpen(true)}
          onSelectQuickCategory={handleSelectQuickCategory}
        />

        <Catalog
          productos={productos}
          deletedCount={deletedIds.length}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
          onDeleteProduct={handleDeleteProduct}
          onRestoreProducts={handleRestoreProducts}
        />

        <HowItWorks
          onStartOrder={() => scrollToSection('catalogo')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenMarketingKit={() => setIsMarketingOpen(true)}
      />

      {/* Drawer and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <ProductDetailModal
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <MarketingModal
        isOpen={isMarketingOpen}
        onClose={() => setIsMarketingOpen(false)}
      />

      {/* Floating WhatsApp for instant questions */}
      <WhatsAppFloatingButton />

    </div>
  );
}
