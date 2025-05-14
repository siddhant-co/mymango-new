// Importing Category from type.ts if you want to reuse the structure
 
import { Product } from "@/types/Products";
import { Category, Testimonial } from "@/types/ProductTypes";
 
export async function fetchCategories(): Promise<Category[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiUrl}/frontend/categories/`, {
      cache: 'no-store',
    });
 
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
 
    const data = await res.json();
    return data.product_categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
 
export async function fetchBestsellerCategories(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/products`, {
      cache: 'no-store',
    });
 
    if (!res.ok) {
      throw new Error("Failed to fetch bestseller products");
    }
 
    const data = await res.json();
 
    // ✅ Return products, not categories
    return data.products?.slice(0, 9) || [];
  } catch (error) {
    console.error("Error fetching bestseller products:", error);
    return [];
  }
}
 
 
 
//
 
export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://nxadmin.consociate.co.in/frontend/products/?new_arrival=true`,
      {
        cache: "no-store",
      }
    );
 
    if (!res.ok) {
      throw new Error("Failed to fetch new arrival products");
    }
 
    const data = await res.json();
    return data.products || []; // Adjust according to your actual API response
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return [];
  }
}
 
// All products
 
export async function fetchAllProducts(): Promise<Product[]>{
  try {
    const res = await fetch(
      `https://nxadmin.consociate.co.in/frontend/products/?page=1&page_size=1000`,
      {
        cache: 'no-store'
      }
    );
    if (!res.ok) {
      throw new Error (`Failed to fetch All products Data`)
    }
     const data = await res.json();
    return data.products || []; // Adjust according to your actual API response
  } catch (error) {
     console.error("Error fetching All Products data", error);
    return [];
  }
}
 
// Testimonial
 
export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch('https://nxadmin.consociate.co.in/frontend/testimonials/', {
    cache: 'no-store',
  });
 
  if (!res.ok) {
    throw new Error('Failed to fetch testimonials');
  }
 
  const data = await res.json();
  return data.testimonials;
}
 
 
 
 