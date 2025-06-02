import ProductCard from "@/components/Client-side-server/All-products/ProductCard";
import { fetchAllProducts } from "../Function"; // adjust path as needed
import { Product } from "@/types/Products";
import ProductListWithPagination from "@/components/Client-side-server/ProductListWithPagination";
import SortDropdown from "@/components/Client-side-server/SortDropdown";

export default async function ShopPage() {
  const products: Product[] = await fetchAllProducts();

  return (
    <div className="mt-25">
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      <div>
        <SortDropdown/>
      <ProductListWithPagination products={products} />;
      </div>
    </div>
  );
}
