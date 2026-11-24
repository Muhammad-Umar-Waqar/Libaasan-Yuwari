import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard Aceternity UI class merging utility
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
