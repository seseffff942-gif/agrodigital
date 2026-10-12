import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface MarketingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarketingModal: React.FC<MarketingModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const adScripts = [
    {
      title: "Anuncio Facebook / Instagram (Ganaderos & Productores)",
      text: "🚨 Insumos veterinarios directos de bodega a tu finca con pago contraentrega en toda Guatemala.\n\nFórmulas para ganado, antiparasitarios, vitaminas y antibióticos con registro oficial vigente.\n\n📦 Despacho en 24 a 48 horas.\n👉 Escríbenos o consulta disponibilidad hoy mismo."
    },
    {
      title: "Guión TikTok / Reels Orgánico",
      text: "🐄 3 ERRORES al desparasitar tu ganado en invierno:\n1. Usar siempre el mismo principio activo (resistencia parasitaria).\n2. Subdosificar al ojo sin pesar a los animales.\n3. Comprar productos sin garantía de origen ni lote fresco.\n\nEn nuestra tienda online enviamos directo desde bodega central con entrega contraentrega. Revisa el catálogo en el enlace."
    },
    {
      title: "Mensaje de Difusión WhatsApp",
      text: "Estimado amigo ganadero, le saludamos de Agrovet Digital.\n\nTenemos lote disponible de antiparasitarios y suplementos minerales con despacho inmediato y pago al recibir en su municipio o finca.\n\n¿Desea cotizar para su lote?"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-zinc-950/30 backdrop-blur-xs"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-2xl p-6 shadow-xl">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <div>
              <h3 className="text-base font-semibold text-zinc-950">
                Herramientas de Marketing
              </h3>
              <p className="text-xs text-zinc-400">
                Textos listos para captar clientes en redes y WhatsApp.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-950"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 my-6">
            {adScripts.map((ad, idx) => (
              <div key={idx} className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-900">{ad.title}</span>
                  <button
                    onClick={() => copyToClipboard(ad.text, idx)}
                    className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-950 px-2 py-0.5 rounded border border-zinc-200 hover:border-zinc-400 bg-white"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-zinc-600 whitespace-pre-line leading-relaxed font-mono bg-white p-2.5 rounded border border-zinc-100">
                  {ad.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800"
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
