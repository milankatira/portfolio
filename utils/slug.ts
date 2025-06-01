export function toSlug(input: string) {
  return input?.toLowerCase().replace(/\s+/g, "-");
}

export function revertSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
