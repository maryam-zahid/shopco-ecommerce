import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";

import {
  PrismaClient,
  ProductStatus,
  Role,
} from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

type SeedColor = {
  name: string;
  value: string;
};

type SeedProduct = {
  name: string;
  slug: string;
  description: string;

  price: number;
  discountPrice?: number;

  images: string[];

  colors: SeedColor[];
  sizes: string[];

  isFeatured?: boolean;
  isNewArrival?: boolean;
};

const products: SeedProduct[] = [
  {
    name: "ONE LIFE GRAPHIC T-SHIRT",
    slug: "one-life-graphic-t-shirt",

    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",

    price: 300,
    discountPrice: 260,

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

    isFeatured: true,
    isNewArrival: true,
  },

  {
    name: "T-SHIRT WITH TAPE DETAILS",
    slug: "t-shirt-with-tape-details",

    description:
      "A stylish everyday t-shirt made with comfortable fabric and distinctive tape detailing.",

    price: 120,
images: [
  "/images/products/t-shirt-with-tape-details.png",
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

    isFeatured: true,
    isNewArrival: true,
  },

  {
    name: "SKINNY FIT JEANS",
    slug: "skinny-fit-jeans",

    description:
      "Modern skinny fit jeans designed for everyday comfort with a clean and versatile silhouette.",

    price: 260,
    discountPrice: 240,

   images: [
  "/images/products/skinny-fit-jeans.png",
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

    isFeatured: true,
    isNewArrival: true,
  },

  {
    name: "CHECKERED SHIRT",
    slug: "checkered-shirt",

    description:
      "A classic checkered shirt combining relaxed comfort with a timeless casual design.",

    price: 180,
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

    isFeatured: true,
    isNewArrival: true,
  },

  {
    name: "SLEEVE STRIPED T-SHIRT",
    slug: "sleeve-striped-t-shirt",

    description:
      "A sporty striped t-shirt with a relaxed fit designed for everyday casual wear.",

    price: 160,
    discountPrice: 130,

   images: [
  "/images/products/sleeve-striped-t-shirt.png",
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

    isFeatured: true,
    isNewArrival: true,
  },

  {
    name: "POLO WITH CONTRAST TRIMS",
    slug: "polo-with-contrast-trims",

    description:
      "A stylish polo shirt featuring contrast trims for a clean and modern look with a comfortable everyday fit.",

    price: 242,
    discountPrice: 212,

    images: [
  "/images/products/recommended/polo-contrast.png",
],

    colors: [
      {
        name: "Blue",
        value: "#0F5B78",
      },
      {
        name: "White",
        value: "#F5F5F5",
      },
      {
        name: "Navy",
        value: "#31344F",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],
  },

  {
    name: "GRADIENT GRAPHIC T-SHIRT",
    slug: "gradient-graphic-t-shirt",

    description:
      "A bold graphic t-shirt featuring a colorful gradient print with a relaxed and comfortable everyday fit.",

    price: 145,

 images: [
  "/images/products/recommended/gradient-graphic.png",
],
    colors: [
      {
        name: "White",
        value: "#F5F5F5",
      },
      {
        name: "Pink",
        value: "#E77B9D",
      },
      {
        name: "Blue",
        value: "#5FA6D8",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],

    isFeatured: true,
  },

  {
    name: "POLO WITH TIPPING DETAILS",
    slug: "polo-with-tipping-details",

    description:
      "A classic polo shirt with refined tipping details designed for a polished and comfortable casual style.",

    price: 180,

   images: [
  "/images/products/recommended/polo-tipping.png",
],
    colors: [
      {
        name: "Rose",
        value: "#A85B64",
      },
      {
        name: "Navy",
        value: "#31344F",
      },
      {
        name: "Black",
        value: "#111111",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],
  },

  {
    name: "BLACK STRIPED T-SHIRT",
    slug: "black-striped-t-shirt",

    description:
      "A versatile striped t-shirt with contrasting black sleeves and a comfortable fit for everyday wear.",

    price: 150,
    discountPrice: 120,

   images: [
  "/images/products/recommended/black-striped.png",
],

    colors: [
      {
        name: "Black",
        value: "#111111",
      },
      {
        name: "White",
        value: "#F5F5F5",
      },
      {
        name: "Gray",
        value: "#808080",
      },
    ],

    sizes: ["Small", "Medium", "Large", "X-Large"],
  },
];

function createSku(
  slug: string,
  color: string,
  size: string,
) {
  const productPart = slug
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 10);

  const colorPart = color
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 8);

  const sizePart = size
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  return `${productPart}-${colorPart}-${sizePart}`;
}

async function main() {
  console.log("Starting SHOP.CO seed...");

  // =====================================================
  // ADMIN
  // =====================================================

  const adminPasswordHash = await bcrypt.hash(
    "Admin@12345",
    12,
  );

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@shopco.local",
    },

    update: {
      name: "SHOP.CO Admin",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
      isActive: true,
    },

    create: {
      name: "SHOP.CO Admin",
      email: "admin@shopco.local",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
      isActive: true,
    },
  });

  console.log(`Admin ready: ${admin.email}`);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const menCategory = await prisma.category.upsert({
    where: {
      slug: "men",
    },

    update: {
      name: "Men",
      isActive: true,
    },

    create: {
      name: "Men",
      slug: "men",
      description: "Men's clothing and fashion.",
      isActive: true,
    },
  });

  await prisma.category.upsert({
    where: {
      slug: "women",
    },

    update: {
      name: "Women",
      isActive: true,
    },

    create: {
      name: "Women",
      slug: "women",
      description: "Women's clothing and fashion.",
      isActive: true,
    },
  });

  await prisma.category.upsert({
    where: {
      slug: "kids",
    },

    update: {
      name: "Kids",
      isActive: true,
    },

    create: {
      name: "Kids",
      slug: "kids",
      description: "Kids clothing and fashion.",
      isActive: true,
    },
  });

  console.log("Categories ready.");

  // =====================================================
  // DRESS STYLES
  // =====================================================

  const casualStyle = await prisma.dressStyle.upsert({
    where: {
      slug: "casual",
    },

    update: {
      name: "Casual",
      isActive: true,
    },

    create: {
      name: "Casual",
      slug: "casual",
      description: "Casual everyday clothing.",
      isActive: true,
    },
  });

  await prisma.dressStyle.upsert({
    where: {
      slug: "formal",
    },

    update: {
      name: "Formal",
      isActive: true,
    },

    create: {
      name: "Formal",
      slug: "formal",
      description: "Formal clothing and styles.",
      isActive: true,
    },
  });

  await prisma.dressStyle.upsert({
    where: {
      slug: "party",
    },

    update: {
      name: "Party",
      isActive: true,
    },

    create: {
      name: "Party",
      slug: "party",
      description: "Party and occasion wear.",
      isActive: true,
    },
  });

  await prisma.dressStyle.upsert({
    where: {
      slug: "gym",
    },

    update: {
      name: "Gym",
      isActive: true,
    },

    create: {
      name: "Gym",
      slug: "gym",
      description: "Gym and activewear.",
      isActive: true,
    },
  });

  console.log("Dress styles ready.");

  // =====================================================
  // PRODUCTS + VARIANTS
  // =====================================================

  for (const seedProduct of products) {
    const product = await prisma.product.upsert({
      where: {
        slug: seedProduct.slug,
      },

      update: {
        name: seedProduct.name,
        description: seedProduct.description,

        price: seedProduct.price,
        discountPrice:
          seedProduct.discountPrice ?? null,

        images: seedProduct.images,

        status: ProductStatus.ACTIVE,

        isFeatured:
          seedProduct.isFeatured ?? false,

        isNewArrival:
          seedProduct.isNewArrival ?? false,

        categoryId: menCategory.id,
        dressStyleId: casualStyle.id,
      },

      create: {
        name: seedProduct.name,
        slug: seedProduct.slug,
        description: seedProduct.description,

        price: seedProduct.price,
        discountPrice:
          seedProduct.discountPrice ?? null,

        images: seedProduct.images,

        status: ProductStatus.ACTIVE,

        isFeatured:
          seedProduct.isFeatured ?? false,

        isNewArrival:
          seedProduct.isNewArrival ?? false,

        categoryId: menCategory.id,
        dressStyleId: casualStyle.id,
      },
    });

    const variantData = seedProduct.colors.flatMap(
      (color, colorIndex) =>
        seedProduct.sizes.map(
          (size, sizeIndex) => ({
            productId: product.id,

            sku: createSku(
              seedProduct.slug,
              color.name,
              size,
            ),

            colorName: color.name,
            colorValue: color.value,

            size,

            stock:
              4 +
              ((colorIndex + sizeIndex) % 6),

            isActive: true,
          }),
        ),
    );

    await prisma.productVariant.createMany({
      data: variantData,
      skipDuplicates: true,
    });

    console.log(
      `Product ready: ${seedProduct.name}`,
    );
  }

  console.log(
    `${products.length} products ready.`,
  );

  console.log(
    "SHOP.CO seed completed successfully.",
  );
}

main()
  .catch((error) => {
    console.error("SHOP.CO seed failed.");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });