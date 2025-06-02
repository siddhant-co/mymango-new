// components/Shop/SortDropdown.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SortDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 on sort change
    params.set("page", "1");

    if (selectedSort) {
      params.set("sort", selectedSort);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={onChange}
      className="border px-3 py-1 rounded"
      aria-label="Sort products"
    >
      <option value="">Sort by</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;
