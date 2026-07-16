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
