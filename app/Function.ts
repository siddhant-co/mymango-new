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
 
  export async function fetchAllProducts(currentPage?: number): Promise<Product[]>{
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



// category
 
 
 
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
  if (!res.ok) throw new Error("Failed to fetch products sorted by price low to high");

  const data = await res.json();
  return {
    products: data.products ?? data.data ?? [],
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchProductsPriceHighToLow(page: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frontend/products?page=${page}&sort=price-high-low`);
  if (!res.ok) throw new Error("Failed to fetch products sorted by price high to low");

  const data = await res.json();
  return {
    products: data.products ?? data.data ?? [],
    totalPages: data.totalPages ?? 1,
  };
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
export const addAddresss = async (
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

export async function updateAddresss(
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



// redux cart


// Fetch all cart items
export const fetchCartItems = async (token: string | null) => {
  const response = await fetch('https://ecom-testing.up.railway.app/cart', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,  
    },
  });

  if (!response.ok) throw new Error('Failed to fetch cart items');
  return response.json();
};


// Delete a specific item
export const deleteCartItem = async (itemId: number, token: string | null) => {
  if (!token) throw new Error("No token provided");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove/${itemId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return await response.json(); // or response.text(), depending on your API
};


// Clear the entire cart
export const clearCart = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Failed to clear cart');
};



export const addToCartApi = async (
  { productId, quantity, variantId }: { productId: number; quantity: number; variantId?: number | null },
  token: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Authorization": `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity, variantId }),
  });

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  return await response.json();
};


// Address



export async function fetchAddresses(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
    headers: { Authorization: `Token ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch addresses');
  return res.json();
}

// Function/addAddress.ts

export async function addAddress(token: string, body: {
  fullName: string;
  phone: string;
  pincode: string;
  state: string;
  city: string;
  addressLine: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('Failed to add address');
  return res.json();
}

export async function updateAddress(token: string, id: number, body: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to update address');
  return res.json();
}

export async function deleteAddress(token: string, id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  const data = await res.json().catch(() => null); // avoid crash on empty body

  if (!res.ok) {
    console.error("Delete failed:", res.status, data);
    throw new Error(data?.message || 'Failed to delete address');
  }
}
