import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem, OrderData } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string | number, delta: number) => void;
  onRemoveItem: (id: string | number) => void;
  onClearCart?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const [formData, setFormData] = useState<OrderData>({
    customerName: '',
    customerPhone: '',
    department: 'Guatemala',
    municipality: '',
    address: '',
    fincaName: '',
    paymentMethod: 'contraentrega',
    notes: ''
  });

  if (!isOpen) return null;

  const totalCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  const subtotal = cart.reduce((sum, item) => {
    const rawPrice = item.producto.Precio;
    if (rawPrice && rawPrice !== 'Consultar') {
      const num = parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) return sum + (num * item.cantidad);
    }
    return sum;
  }, 0);

  const shipping = 35;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  const handleSendWhatsApp = () => {
    if (!formData.customerName || !formData.customerPhone || !formData.address) {
      alert('Completa tu nombre, teléfono y dirección.');
      return;
    }

    let msg = `*PEDIDO AGROVET DIGITAL*\n\n`;
    msg += `Cliente: ${formData.customerName}\n`;
    msg += `Teléfono: ${formData.customerPhone}\n`;
    msg += `Ubicación: ${formData.address}, ${formData.municipality}, ${formData.department}\n`;
    msg += `Pago: ${formData.paymentMethod === 'contraentrega' ? 'Contraentrega (Efectivo al recibir)' : 'Transferencia'}\n\n`;
    msg += `*PRODUCTOS:*\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.producto.Nombre} (${item.producto.Identificación}) x ${item.cantidad}\n`;
    });

    if (subtotal > 0) {
      msg += `\nSubtotal: Q${subtotal.toFixed(2)}`;
      msg += `\nEnvío: Q${shipping.toFixed(2)}`;
      msg += `\n*Total a pagar: Q${total.toFixed(2)}*\n`;
    }

    const phone = '50254743595';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleCopyDropshipFormat = () => {
    let order = `📦 ORDEN BODEGA (DROPSHIPPING)\nDestino: ${formData.customerName} - Tel: ${formData.customerPhone}\nDirección: ${formData.address}, ${formData.municipality}, ${formData.department}\n\n`;
    cart.forEach(item => {
      order += `• [${item.producto.Identificación}] ${item.producto.Nombre} x ${item.cantidad}\n`;
    });
    order += `\nCobro contraentrega: Q${total.toFixed(2)}`;
    navigator.clipboard.writeText(order);
    alert('Orden copiada para enviar a bodega Agricovet.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white border-l border-zinc-200 flex flex-col justify-between shadow-xl">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                Tu Bolsa
              </h3>
              <p className="text-[11px] text-zinc-400">
                {totalCount} {totalCount === 1 ? 'artículo' : 'artículos'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List or Form */}
          <div className="p-5 overflow-y-auto flex-grow space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center text-xs text-zinc-400">
                Tu bolsa está vacía.
              </div>
            ) : !isCheckout ? (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={String(item.producto.Identificación)} className="flex items-center gap-3 py-2 border-b border-zinc-100">
                    <img 
                      src={item.producto.imagen_url || item.producto.Imagen || '/placeholder-bottle.webp'} 
                      alt={item.producto.Nombre}
                      className="w-10 h-10 object-contain bg-zinc-50 rounded p-1 shrink-0"
                    />

                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-medium text-zinc-900 truncate">
                        {item.producto.Nombre}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {item.producto.Precio ? `Q${item.producto.Precio}` : 'A cotizar'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 border border-zinc-200 rounded px-1.5 py-0.5">
                      <button 
                        onClick={() => onUpdateQuantity(item.producto.Identificación, -1)}
                        className="text-zinc-400 hover:text-zinc-950 text-xs"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="text-xs text-zinc-800 font-medium px-1">
                        {item.cantidad}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.producto.Identificación, 1)}
                        className="text-zinc-400 hover:text-zinc-950 text-xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(item.producto.Identificación)}
                      className="text-zinc-300 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-zinc-600 block mb-1">Nombre</label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded text-xs focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-zinc-600 block mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.customerPhone}
                    onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded text-xs focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-zinc-600 block mb-1">Departamento</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded text-xs focus:outline-none focus:border-zinc-950 bg-white"
                  >
                    <option value="Guatemala">Guatemala</option>
                    <option value="Petén">Petén</option>
                    <option value="Alta Verapaz">Alta Verapaz</option>
                    <option value="Izabal">Izabal</option>
                    <option value="Escuintla">Escuintla</option>
                    <option value="Quetzaltenango">Quetzaltenango</option>
                    <option value="Zacapa">Zacapa</option>
                    <option value="Otros">Otro Departamento</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-600 block mb-1">Municipio</label>
                  <input
                    type="text"
                    value={formData.municipality}
                    onChange={e => setFormData({ ...formData, municipality: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded text-xs focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-zinc-600 block mb-1">Dirección / Finca</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-1.5 border border-zinc-200 rounded text-xs focus:outline-none focus:border-zinc-950"
                  />
                </div>

                <div>
                  <label className="text-zinc-600 block mb-1">Método de pago</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'contraentrega' })}
                      className={`flex-1 py-1.5 text-xs rounded border cursor-pointer ${
                        formData.paymentMethod === 'contraentrega' 
                          ? 'border-zinc-950 bg-zinc-950 text-white' 
                          : 'border-zinc-200 text-zinc-600'
                      }`}
                    >
                      Contraentrega
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'transferencia' })}
                      className={`flex-1 py-1.5 text-xs rounded border cursor-pointer ${
                        formData.paymentMethod === 'transferencia' 
                          ? 'border-zinc-950 bg-zinc-950 text-white' 
                          : 'border-zinc-200 text-zinc-600'
                      }`}
                    >
                      Transferencia
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCopyDropshipFormat}
                    className="w-full py-1.5 text-[11px] text-zinc-600 hover:text-zinc-950 border border-dashed border-zinc-300 rounded cursor-pointer"
                  >
                    Copiar Formato Bodega Agricovet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-100 bg-zinc-50">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Subtotal</span>
                <span className="text-zinc-950 font-medium">Q {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-500 mb-3">
                <span>Envío</span>
                <span className="text-zinc-950 font-medium">Q {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-zinc-950 mb-4 pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span>Q {total.toFixed(2)}</span>
              </div>

              {!isCheckout ? (
                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  Continuar
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCheckout(false)}
                    className="px-3 py-2 border border-zinc-200 hover:border-zinc-300 rounded-full text-xs text-zinc-600 cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleSendWhatsApp}
                    className="flex-1 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer transition-all"
                  >
                    Completar por WhatsApp
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
