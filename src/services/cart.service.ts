import "server-only";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const GUEST_CART_COOKIE = "shopco_guest_cart";

function createGuestToken() {
  return randomBytes(32).toString("hex");
}

async function getCustomerId() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  if (session.user.role !== "CUSTOMER") {
    return null;
  }

  return session.user.id;
}

async function getGuestToken() {
  const cookieStore = await cookies();

  return (
    cookieStore.get(GUEST_CART_COOKIE)?.value ??
    null
  );
}

async function createGuestCart() {
  const cookieStore = await cookies();

  const guestToken = createGuestToken();

  const cart = await prisma.cart.create({
    data: {
      guestToken,
    },
  });

  cookieStore.set(
    GUEST_CART_COOKIE,
    guestToken,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    },
  );

  return cart;
}

export async function getOrCreateCart() {
  const customerId = await getCustomerId();

  if (customerId) {
    const existing =
      await prisma.cart.findUnique({
        where: {
          userId: customerId,
        },
      });

    if (existing) {
      return existing;
    }

    return prisma.cart.create({
      data: {
        userId: customerId,
      },
    });
  }

  const guestToken = await getGuestToken();

  if (guestToken) {
    const existing =
      await prisma.cart.findUnique({
        where: {
          guestToken,
        },
      });

    if (existing) {
      return existing;
    }
  }

  return createGuestCart();
}

export async function getCurrentCart() {
  const customerId = await getCustomerId();

  if (customerId) {
    return prisma.cart.findUnique({
      where: {
        userId: customerId,
      },

      include: {
        items: {
          orderBy: {
            createdAt: "asc",
          },

          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },

        coupon: true,
      },
    });
  }

  const guestToken = await getGuestToken();

  if (!guestToken) {
    return null;
  }

  return prisma.cart.findUnique({
    where: {
      guestToken,
    },

    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },

        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },

      coupon: true,
    },
  });
}

export async function addVariantToCart(
  variantId: string,
  quantity: number,
) {
  const variant =
    await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },

      include: {
        product: {
          select: {
            status: true,
          },
        },
      },
    });

  if (!variant) {
    throw new Error(
      "Selected product variant does not exist.",
    );
  }

  if (
    !variant.isActive ||
    variant.product.status !== "ACTIVE"
  ) {
    throw new Error(
      "This product option is currently unavailable.",
    );
  }

  if (variant.stock <= 0) {
    throw new Error(
      "This product option is out of stock.",
    );
  }

  const cart = await getOrCreateCart();

  const existingItem =
    await prisma.cartItem.findUnique({
      where: {
        cartId_variantId: {
          cartId: cart.id,
          variantId,
        },
      },
    });

  const finalQuantity =
    (existingItem?.quantity ?? 0) +
    quantity;

  if (finalQuantity > variant.stock) {
    throw new Error(
      `Only ${variant.stock} item${
        variant.stock === 1 ? "" : "s"
      } available in stock.`,
    );
  }

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },

      data: {
        quantity: finalQuantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      variantId,
      quantity,
    },
  });
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
) {
  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Cart not found.");
  }

  const item = cart.items.find(
    (currentItem) =>
      currentItem.id === cartItemId,
  );

  if (!item) {
    throw new Error(
      "Cart item does not belong to this cart.",
    );
  }

  if (
    !item.variant.isActive ||
    item.variant.product.status !== "ACTIVE"
  ) {
    throw new Error(
      "This product option is unavailable.",
    );
  }

  if (quantity > item.variant.stock) {
    throw new Error(
      `Only ${item.variant.stock} item${
        item.variant.stock === 1
          ? ""
          : "s"
      } available in stock.`,
    );
  }

  return prisma.cartItem.update({
    where: {
      id: cartItemId,
    },

    data: {
      quantity,
    },
  });
}

export async function removeCartItem(
  cartItemId: string,
) {
  const cart = await getCurrentCart();

  if (!cart) {
    throw new Error("Cart not found.");
  }

  const belongsToCart = cart.items.some(
    (item) => item.id === cartItemId,
  );

  if (!belongsToCart) {
    throw new Error(
      "Cart item does not belong to this cart.",
    );
  }

  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });
}
export async function mergeGuestCartIntoCustomer(
  customerId: string,
) {
  const cookieStore = await cookies();

  const guestToken =
    cookieStore.get(GUEST_CART_COOKIE)?.value;

  if (!guestToken) {
    return;
  }

  const guestCart =
    await prisma.cart.findUnique({
      where: {
        guestToken,
      },

      include: {
        items: {
          include: {
            variant: {
              include: {
                product: {
                  select: {
                    status: true,
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!guestCart) {
    cookieStore.delete(GUEST_CART_COOKIE);
    return;
  }

  let customerCart =
    await prisma.cart.findUnique({
      where: {
        userId: customerId,
      },
    });

  if (!customerCart) {
    customerCart = await prisma.cart.create({
      data: {
        userId: customerId,
      },
    });
  }

  await prisma.$transaction(async (tx) => {
    for (const guestItem of guestCart.items) {
      const variant = guestItem.variant;

      if (
        !variant.isActive ||
        variant.product.status !== "ACTIVE" ||
        variant.stock <= 0
      ) {
        continue;
      }

      const existingItem =
        await tx.cartItem.findUnique({
          where: {
            cartId_variantId: {
              cartId: customerCart.id,
              variantId: guestItem.variantId,
            },
          },
        });

      const combinedQuantity =
        (existingItem?.quantity ?? 0) +
        guestItem.quantity;

      const safeQuantity = Math.min(
        combinedQuantity,
        variant.stock,
      );

      if (existingItem) {
        await tx.cartItem.update({
          where: {
            id: existingItem.id,
          },

          data: {
            quantity: safeQuantity,
          },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: customerCart.id,
            variantId: guestItem.variantId,
            quantity: Math.min(
              guestItem.quantity,
              variant.stock,
            ),
          },
        });
      }
    }

    await tx.cart.delete({
      where: {
        id: guestCart.id,
      },
    });
  });

  cookieStore.delete(GUEST_CART_COOKIE);
}