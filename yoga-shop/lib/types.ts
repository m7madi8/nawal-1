export type ColorId = "black" | "soft-pink";

export interface ColorVariant {
  id: ColorId;
  label: string;
  /** Swatch hex used for the color selector dot */
  swatch: string;
  /** Product image set for this specific colorway */
  images: ProductImage[];
}

export interface ProductImage {
  src: string;
  alt: string;
  /** "hero" = clean floating product shot, "lifestyle" = in-use, "detail" = texture/close-up */
  type: "hero" | "lifestyle" | "detail";
}

export interface Benefit {
  icon: BenefitIcon;
  title: string;
  description: string;
}

export type BenefitIcon =
  | "grip"
  | "leaf"
  | "cushion"
  | "droplet"
  | "gem"
  | "carry"
  | "shield"
  | "minimal";

export interface Material {
  name: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  practiceStyle?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  startingPrice: number;
  currency: string;
  shortDescription: string;
  story: string[];
  colors: ColorVariant[];
  benefits: Benefit[];
  materials: Material[];
  specifications: { label: string; value: string }[];
  shipping: string;
  reviews: Review[];
  faq: FAQItem[];
}
