export interface Product {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  category_name: string;
  description: string;
  selling_price: string;
  images: string[];
  // Add any other properties your product objects have
  [key: string]: any; // Allows for additional, potentially unknown properties
}