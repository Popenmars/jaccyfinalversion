export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stockQuantity: number;
  inStock: boolean;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderRef: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  instructions: string | null;
  products: unknown;
  total: number;
  status: string;
  receiptImage: string | null;
  createdAt: Date;
}
