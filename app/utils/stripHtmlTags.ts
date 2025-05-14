// app/utils/sanitize.ts
import DOMPurify from "dompurify";

export const stripHtmlTags = (htmlContent: string): string => {
  // Sanitize the HTML using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: [] }); // This removes all tags.
  return sanitizedContent;
};
