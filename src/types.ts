export interface Producto {
  Identificación: string | number;
  Nombre: string;
  Categoría: string;
  Existencias: number | string;
  resaltado?: boolean;
  Imagen?: string;
  imagen_url?: string;
  Precio?: number | string;
  Descripción?: string;
  dosis?: string;
  especie?: string;
  laboratorio?: string;
}

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

export interface OrderData {
  customerName: string;
  customerPhone: string;
  department: string;
  municipality: string;
  address: string;
  fincaName?: string;
  paymentMethod: 'contraentrega' | 'transferencia';
  notes?: string;
}
