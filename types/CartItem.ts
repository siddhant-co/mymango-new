// types/CartItem.ts
export interface CartItem {
  id: number;
  name: string;
  basePrice: number;
  quantity: number;
  imageURL: string; // ✅ required for rendering product image
}
