export type CategoryProduct = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
};

export const casualProducts: CategoryProduct[] = [
  {
    id: 1,
    slug: "gradient-graphic-t-shirt",
    name: "Gradient Graphic T-shirt",
    image: "/images/products/recommended/gradient-graphic.png",
    price: 145,
    rating: 3.5,
  },
  {
    id: 2,
    slug: "polo-with-tipping-details",
    name: "Polo with Tipping Details",
    image: "/images/products/recommended/polo-tipping.png",
    price: 180,
    rating: 4.5,
  },
  {
    id: 3,
    slug: "black-striped-t-shirt",
    name: "Black Striped T-shirt",
    image: "/images/products/recommended/black-striped.png",
    price: 120,
    oldPrice: 150,
    discount: 30,
    rating: 5,
  },
  {
    id: 4,
    slug: "skinny-fit-jeans",
    name: "Skinny Fit Jeans",
    image: "/images/products/skinny-fit-jeans.png",
    price: 240,
    oldPrice: 260,
    discount: 20,
    rating: 3.5,
  },
  {
    id: 5,
    slug: "checkered-shirt",
    name: "Checkered Shirt",
    image: "/images/products/checkered-shirt.png",
    price: 180,
    rating: 4.5,
  },
  {
    id: 6,
    slug: "sleeve-striped-t-shirt",
    name: "Sleeve Striped T-shirt",
    image: "/images/products/sleeve-striped-t-shirt.png",
    price: 130,
    oldPrice: 160,
    discount: 30,
    rating: 4.5,
  },
  {
    id: 7,
    slug: "vertical-striped-shirt",
    name: "Vertical Striped Shirt",
    image: "/images/products/vertical-striped-shirt.png",
    price: 212,
    oldPrice: 232,
    discount: 20,
    rating: 5,
  },
  {
    id: 8,
    slug: "courage-graphic-t-shirt",
    name: "Courage Graphic T-shirt",
    image: "/images/products/courage-graphic-t-shirt.png",
    price: 145,
    rating: 4,
  },
  {
    id: 9,
    slug: "loose-fit-bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    image: "/images/products/loose-fit-bermuda-shorts.png",
    price: 80,
    rating: 3,
  },
];