export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  // Remove HTML tags
  return input.replace(/<[^>]*>?/gm, "");
};
