export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  slug: string;
  [key: string]: any; 
}
export interface Variant {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  images?: { url: string }[];
}