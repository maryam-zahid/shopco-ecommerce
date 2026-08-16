export type ProductDetailColor = {
  name: string;
  value: string;
};

export type ProductDetailVariant = {
  id: string;
  colorName: string;
  colorValue: string;
  size: string;
  stock: number;
  isActive: boolean;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;

  description: string;

  images: string[];

  price: number;
  oldPrice?: number;
  discount?: number;

  rating: number;

  colors: ProductDetailColor[];

  sizes: string[];

  selectedSize: string;

  variants: ProductDetailVariant[];

  breadcrumb: string[];
};