export const stripHtmlTags = (htmlContent: string): string => {
  return htmlContent.replace(/<[^>]*>/g, '');
};
