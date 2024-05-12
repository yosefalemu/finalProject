import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateText = (str: string) => {
  if (str.length > 25) {
    return str.slice(0, 40) + "...";
  }
  return str;
};
