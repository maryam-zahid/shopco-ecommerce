import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

import AdminCouponsClient from "@/components/admin/coupons/admin-coupons-client";

export default async function AdminCouponsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }

  const coupons =
    await prisma.coupon.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <div className="w-full">
      <div className="mb-[24px]">
        <h1 className="text-[28px] font-bold text-black">
          Coupons
        </h1>

        <p className="mt-[5px] text-[14px] text-black/50">
          Create and manage promotional discount codes.
        </p>
      </div>

      <AdminCouponsClient
        initialCoupons={coupons.map(
          (coupon) => ({
            id: coupon.id,

            code:
              coupon.code,

            discountType:
              coupon.discountType,

            discountValue:
              Number(
                coupon.discountValue,
              ),

            isActive:
              coupon.isActive,

            startsAt:
              coupon.startsAt?.toISOString() ??
              null,

            expiresAt:
              coupon.expiresAt?.toISOString() ??
              null,

            minimumOrderAmount:
              coupon.minimumOrderAmount !==
              null
                ? Number(
                    coupon.minimumOrderAmount,
                  )
                : null,

            usageLimit:
              coupon.usageLimit,

            usedCount:
              coupon.usedCount,
          }),
        )}
      />
    </div>
  );
}