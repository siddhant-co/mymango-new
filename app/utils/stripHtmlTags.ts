
import DOMPurify from "dompurify";

export const stripHtmlTags = (htmlContent: string): string => {
 
  const sanitizedContent = DOMPurify.sanitize(htmlContent, { ALLOWED_TAGS: [] }); 
  return sanitizedContent;
};
