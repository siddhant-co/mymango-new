// types.ts
export interface ChildCategory {
  id: number;
  image: string;
  heading: string;
  description: string;
  product_count: number;
  title: string;
  slug: string;
}

export interface Category {
  id: number;
  banner: string;
  name: string;
  heading: string;
  image: string;
  description: string;
  slug: string;
  child_categories: ChildCategory[];
}

export interface ApiResponse {
  product_categories: Category[];
}
