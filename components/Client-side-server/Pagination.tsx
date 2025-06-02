// Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (end - start + 1 < maxVisible) {
      if (start === 1) end = Math.min(totalPages, start + maxVisible - 1);
      else if (end === totalPages) start = Math.max(1, totalPages - maxVisible + 1);
    }

    const pages: (number | string)[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 mt-6 justify-center">
      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">...</span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
