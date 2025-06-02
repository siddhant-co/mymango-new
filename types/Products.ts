export interface Product {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  category_name: string;
  description: string;
  selling_price: string;
  images: string[];

  [key: string]: any; 
}