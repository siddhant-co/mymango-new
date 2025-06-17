import { ReactNode } from "react";

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
  [x: string]: ReactNode;
  description: any;
  id: number;
  name: string;
  slug: string;
}

export interface ApiResponse {
  product_categories: Category[];
}
