"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = toSlug;
exports.revertSlug = revertSlug;
function toSlug(input) {
    return input === null || input === void 0 ? void 0 : input.toLowerCase().replace(/\s+/g, "-");
}
function revertSlug(slug) {
    return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}
