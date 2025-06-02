// types/CartItem.ts
export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string; // ✅ required for rendering product image
}
