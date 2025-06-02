"use client";

import React from "react";

type Props = {
  allTags: string[];
  selectedTag: string;
  onTagChange: (tag: string) => void;
};

const PREDEFINED_TAGS = [
  "Cafe",
  "Hotel",
  "Living Room",
  "Office",
  "Outdoor and Garden",
  "School",
  "Storage Solutions",
  "Wedding",
];

export default function TagFilter({ allTags, selectedTag, onTagChange }: Props) {

  const tags = PREDEFINED_TAGS.filter(tag => allTags.includes(tag));

  return (

    <div>
      <h1 className="text-center p-5 bg-[#aac82c] mb-2">Filters</h1>
    <div className="flex flex-col flex-wrap gap-3 mb-6 ">
      <button
        onClick={() => onTagChange("all")}
        className={`px-4 py-2  border cursor-pointer  ${
          selectedTag === "all" ? "bg-orange-500 text-white cursor-pointer" : "bg-white text-gray-800 cursor-pointer"
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`px-20 py-2  border cursor-pointer  ${
            selectedTag === tag ? "bg-orange-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          {tag}
        </button>
      ))}
      </div>
      
      </div>
  );
}
