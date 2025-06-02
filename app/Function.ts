// Importing Category from type.ts if you want to reuse the structure
 
  import { Product } from "@/types/Products";
import { Testimonial } from "@/types/ProductTypes";
 

 
 
export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/products/?new_arrival=true`,
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
    // console.error("Error fetching new arrivals:", error);
    return [];
  }
}
 
// All products
 
  export async function fetchAllProducts(): Promise<Product[]>{
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/products/?page=1&page_size=1000`,
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
      //  console.error("Error fetching All Products data", error);
      return [];
    }
  }
 
// Testimonial
 
export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/testimonials/`, {
    cache: 'no-store',
  });
 
  if (!res.ok) {
    throw new Error('Failed to fetch testimonials');
  }
 
  const data = await res.json();
  return data.testimonials;
}
 
 
 
export async function getCategoryProducts(slug: string): Promise<Product[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/products?category=${encodeURIComponent(slug)}`;
    // console.log("Fetching products for category:", slug);
    // console.log("Fetching URL:", url);

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch products for category ${slug}`);
    }

    const data = await res.json();
    // console.log("Fetched data:", data);
    return data.products || [];
  } catch (error) {
    // console.error("Error fetching products data", error);
    return [];
  }
} 

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/product_info/?slug=${slug}`, {
      cache: 'no-store', // for fresh data on every request
    });

    if (!res.ok) {
      console.error('Failed to fetch product');
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}


// filter by sort



export async function fetchProductsPriceLowToHigh(page: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontend/products?page=${page}&sort=price-low-high`);

  if (!res.ok) {
    throw new Error("Failed to fetch products sorted by price low to high");
  }

  return res.json(); // Expected to return { products: [...], totalPages: number }
}


export async function fetchProductsPriceHighToLow(page: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontend/products?page=${page}&sort=price-high-low`);

  if (!res.ok) {
    throw new Error("Failed to fetch products sorted by price high to low");
  }

  return res.json(); // Expected to return { products: [...], totalPages: number }
}

// PriceRange


export async function getPriceRange(): Promise<{ minPrice: number; maxPrice: number }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/frontend/products/`);
  const data = await res.json();
  const prices = (data.products ?? data.data ?? []).map((p: any) => p.price).filter(Boolean);

  if (prices.length === 0) return { minPrice: 0, maxPrice: 0 };

  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

//

// utils/api/addAddress.ts
export const addAddress = async (
  customerId: string,
  formValues: Record<string, string>,
  token: string
): Promise<any> => {
  const formData = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/customer-address/?customer=${customerId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to add address");
  }

  return res.json();
};
//

// getAddresses.ts
export const showAddress = async (
  customerId: number,
  token: string
): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/customer-address/?customer=${customerId}`,
    {
      method: "GET",
      headers: {
        'Authorization': `Token ${token}`, // or `Bearer ${token}` depending on backend
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch addresses");
  }

  return res.json();
};

// update address

export async function updateAddress(
  id: number,
  customerId: string,
  data: {
    address: string;
    locality: string;
    zipcode: string;
    country: string;
  },
  token: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/customer-address/${id}/?customer=${customerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Update failed:', errorText);
    throw new Error('Failed to update address');
  }

  return res.json();
}
