export interface Category {
  id: number;
  name: string;
  description: string;
  title: string;
  slug: string;
  seo_title: string;
  seo_data: string;
  seo_description: string;
  seo_keyword: string;
  image: string;
  heading: string;
  banner: string;
  product_count: number;
  updated_at: string;
  child_categories: Category[];
}
 
// app/type.ts
 
export interface Product {
  id: number;
  slug: string;
  variant_id: number | null;
  sequence_number: number;
  name: string;
  category_id: number;
  category_name: string;
  minimum_order_quantity: number;
  description: string;
  seo_title: string;
  seo_description: string;
  seo_keyword: string;
  base_price: string;
  selling_price: string;
  base_and_selling_price_difference_in_percent: number;
  stock: number;
  is_new_arrival: boolean;
  images: string[];
  tags: string[];
  has_variant: boolean;
}
 
//
 
export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  profile_picture: string;
  testimonial: string;
}
 