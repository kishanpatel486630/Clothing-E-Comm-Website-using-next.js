export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string; hint: string }[];
  sizes: string[];
  colors: string[];
  category: string;
  stock: number;
};

export type CartItem = {
  id: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
};

export type Order = {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    shippingAddress: Address;
    billingAddress: Address;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
}

export type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}
