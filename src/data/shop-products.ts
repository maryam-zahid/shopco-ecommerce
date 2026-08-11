export type ShopProduct = {
  id: number;
  slug: string;
  name: string;

  price: number;
  oldPrice?: number;
  discount?: number;

  rating: number;

  description: string;

  images: string[];

  colors: {
    name: string;
    value: string;
  }[];

  sizes: string[];

  selectedSize: string;

  breadcrumb: string[];
};

export const shopProducts: ShopProduct[] = [
  {
    id: 1,
    slug: "one-life-graphic-t-shirt",
    name: "ONE LIFE GRAPHIC T-SHIRT",

    price: 260,
    oldPrice: 300,
    discount: 40,

    rating: 4.5,

    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",

    images: [
      "/images/products/one-life/front.png",
      "/images/products/one-life/back.png",
      "/images/products/one-life/model.png",
    ],

    colors: [
      {
        name: "Olive",
        value: "#4F4631",
      },
      {
        name: "Dark Green",
        value: "#314F4A",
      },
      {
        name: "Navy",
        value: "#31344F",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],

    selectedSize: "Large",

    breadcrumb: ["Home", "Shop", "Men", "T-shirts"],
  },

  {
    id: 2,
    slug: "t-shirt-with-tape-details",
    name: "T-SHIRT WITH TAPE DETAILS",

    price: 120,

    rating: 4.5,

    description:
      "A stylish everyday t-shirt made with comfortable fabric and distinctive tape detailing.",

    images: [
      "/images/products/tape-tshirt/front.png",
      "/images/products/tape-tshirt/back.png",
      "/images/products/tape-tshirt/model.png",
    ],

    colors: [
      {
        name: "Black",
        value: "#000000",
      },
      {
        name: "Gray",
        value: "#808080",
      },
      {
        name: "Navy",
        value: "#31344F",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],

    selectedSize: "Large",

    breadcrumb: ["Home", "Shop", "Men", "T-shirts"],
  },

  {
    id: 3,
    slug: "skinny-fit-jeans",
    name: "SKINNY FIT JEANS",

    price: 240,
    oldPrice: 260,
    discount: 20,

    rating: 3.5,

    description:
      "Modern skinny fit jeans designed for everyday comfort with a clean and versatile silhouette.",

    images: [
      "/images/products/skinny-jeans/front.png",
      "/images/products/skinny-jeans/back.png",
      "/images/products/skinny-jeans/model.png",
    ],

    colors: [
      {
        name: "Blue",
        value: "#314F6B",
      },
      {
        name: "Dark Blue",
        value: "#1D2E40",
      },
      {
        name: "Black",
        value: "#1A1A1A",
      },
    ],

    sizes: ["28", "30", "32", "34"],

    selectedSize: "32",

    breadcrumb: ["Home", "Shop", "Men", "Jeans"],
  },

  {
    id: 4,
    slug: "checkered-shirt",
    name: "CHECKERED SHIRT",

    price: 180,

    rating: 4.5,

    description:
      "A classic checkered shirt combining relaxed comfort with a timeless casual design.",

    images: [
      "/images/products/checkered-shirt/front.png",
      "/images/products/checkered-shirt/back.png",
      "/images/products/checkered-shirt/model.png",
    ],

    colors: [
      {
        name: "Red",
        value: "#7D2632",
      },
      {
        name: "Navy",
        value: "#31344F",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],

    selectedSize: "Large",

    breadcrumb: ["Home", "Shop", "Men", "Shirts"],
  },

  {
    id: 5,
    slug: "sleeve-striped-t-shirt",
    name: "SLEEVE STRIPED T-SHIRT",

    price: 130,
    oldPrice: 160,
    discount: 30,

    rating: 4.5,

    description:
      "A sporty striped t-shirt with a relaxed fit designed for everyday casual wear.",

    images: [
      "/images/products/sleeve-striped/front.png",
      "/images/products/sleeve-striped/back.png",
      "/images/products/sleeve-striped/model.png",
    ],

    colors: [
      {
        name: "Orange",
        value: "#F05A28",
      },
      {
        name: "Black",
        value: "#111111",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],

    selectedSize: "Large",

    breadcrumb: ["Home", "Shop", "Men", "T-shirts"],
  },
];

export function getProductBySlug(slug: string) {
  return shopProducts.find((product) => product.slug === slug);
}