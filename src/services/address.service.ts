import "server-only";

import { prisma } from "@/lib/prisma";
import type { AddressInput } from "@/validations/address.schema";

export async function getCustomerAddresses(
  userId: string,
) {
  return prisma.address.findMany({
    where: {
      userId,
    },

    orderBy: [
      {
        isDefault: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
}

export async function createCustomerAddress(
  userId: string,
  data: AddressInput,
) {
  return prisma.$transaction(async (tx) => {
    const addressCount =
      await tx.address.count({
        where: {
          userId,
        },
      });

    const shouldBeDefault =
      data.isDefault || addressCount === 0;

    if (shouldBeDefault) {
      await tx.address.updateMany({
        where: {
          userId,
          isDefault: true,
        },

        data: {
          isDefault: false,
        },
      });
    }

    return tx.address.create({
      data: {
  userId,

  fullName: data.fullName,
  email: data.email,
  phone: data.phone,

  addressLine1:
    data.addressLine1,

  addressLine2:
    data.addressLine2 || null,

  city: data.city,

  state:
    data.state || null,

  postalCode:
    data.postalCode,

  country:
    data.country,

  isDefault:
    shouldBeDefault,
},
    });
  });
}