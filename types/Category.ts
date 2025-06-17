// types.ts
export interface ChildCategory {
  categoryId: number;
  image: string;
  heading: string;
  product_count: number;
  title: string;
  slug: string;
}

export interface Category {
  description: any;
  id: number;
  name: string;
  slug: string;
  child_categories: ChildCategory[];
}

export interface ApiResponse {
  product_categories: Category[];
}
