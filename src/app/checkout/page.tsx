import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Headphones,
  LockKeyhole,
  RotateCcw,
} from "lucide-react";

import { auth } from "@/auth";

import CheckoutOptions from "@/components/checkout/checkout-options";

import { getCustomerAddresses } from "@/services/address.service";
import { getCurrentCart } from "@/services/cart.service";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(
      "/login?callbackUrl=/checkout",
    );
  }

  if (session.user.role !== "CUSTOMER") {
    redirect("/");
  }

  const [cart, addresses] =
    await Promise.all([
      getCurrentCart(),

      getCustomerAddresses(
        session.user.id,
      ),
    ]);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const calculatedItems =
    cart.items.map((item) => {
      const product =
        item.variant.product;

      const basePrice =
        Number(product.price);

      const productPrice =
        product.discountPrice !== null
          ? Number(
              product.discountPrice,
            )
          : basePrice;

      const unitPrice =
        item.variant.priceOverride !== null
          ? Number(
              item.variant.priceOverride,
            )
          : productPrice;

      return {
        id: item.id,

        name: product.name,

        image:
          product.images[0] ??
          "/images/products/t-shirt-with-tape-details.png",

        color:
          item.variant.colorName,

        size:
          item.variant.size,

        quantity:
          item.quantity,

        unitPrice,

        lineTotal:
          unitPrice * item.quantity,
      };
    });

  const subtotal =
    calculatedItems.reduce(
      (total, item) =>
        total + item.lineTotal,
      0,
    );

  const discount = 0;

  const deliveryFee = 15;

  const tax = 0;

  const total =
    subtotal -
    discount +
    deliveryFee +
    tax;

  return (
    <main className="w-full bg-white">
      <section
        className="
          mx-auto
          w-full

          px-[16px]
          pb-[72px]
          pt-[24px]

          min-[800px]:px-[32px]

          min-[1200px]:max-w-[1440px]
          min-[1200px]:px-[60px]

          min-[1440px]:px-[72px]
        "
      >
        {/* BREADCRUMB */}
        <div
          className="
            flex
            items-center
            gap-[8px]

            text-[14px]
            text-black/60
          "
          style={{
            fontFamily: "var(--font-satoshi)",
          }}
        >
          <span>Home</span>
          <span>/</span>
          <span>Cart</span>
          <span>/</span>

          <span className="font-medium text-black">
            Checkout
          </span>
        </div>

        {/* TITLE */}
        <h1
          className="
            mt-[10px]
            text-[34px]
            leading-[40px]
            text-black

            min-[800px]:text-[42px]
            min-[800px]:leading-[48px]
          "
          style={{
            fontFamily:
              "var(--font-archivo-black)",
            fontWeight: 400,
          }}
        >
          CHECKOUT
        </h1>

        {/* MAIN GRID */}
        <div
          className="
            mt-[22px]

            grid
            grid-cols-1
            gap-[20px]

            min-[1100px]:grid-cols-[1.55fr_0.82fr]
          "
        >
          {/* LEFT */}
          <CheckoutOptions
            customerName={
              session.user.name ?? ""
            }
            addresses={addresses.map(
              (address) => ({
                id: address.id,
                fullName:
                  address.fullName,
                phone:
                  address.phone,
                addressLine1:
                  address.addressLine1,
                addressLine2:
                  address.addressLine2,
                city:
                  address.city,
                state:
                  address.state,
                postalCode:
                  address.postalCode,
                country:
                  address.country,
                isDefault:
                  address.isDefault,
              }),
            )}
          />

          {/* RIGHT */}
          <aside
            className="
              h-fit
              rounded-[12px]
              border
              border-black/10
              bg-white

              p-[18px]

              min-[800px]:p-[20px]
            "
          >
            <h2
              className="
                text-[17px]
                font-bold
                uppercase
                text-black
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",
              }}
            >
              Order Summary
            </h2>

            {/* ITEMS */}
            <div className="mt-[18px] space-y-[16px]">
              {calculatedItems.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      gap-[12px]
                    "
                  >
                    <div
                      className="
                        relative
                        h-[68px]
                        w-[68px]
                        shrink-0
                        overflow-hidden

                        rounded-[8px]
                        bg-[#F0EEED]
                      "
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="68px"
                        className="object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          truncate
                          text-[14px]
                          font-semibold
                          text-black
                        "
                      >
                        {item.name}
                      </p>

                      <p className="mt-[3px] text-[12px] text-black/60">
                        {item.color}
                        {" / "}
                        {item.size}
                      </p>

                      <p className="mt-[3px] text-[12px] text-black/60">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p
                      className="
                        shrink-0
                        text-[14px]
                        font-semibold
                        text-black
                      "
                    >
                      $
                      {item.lineTotal.toFixed(
                        2,
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>

            <div className="my-[20px] h-px bg-black/10" />

            {/* PRICES */}
            <div className="space-y-[14px]">
              <SummaryRow
                label="Subtotal"
                value={`$${subtotal.toFixed(
                  2,
                )}`}
              />

              <SummaryRow
                label="Discount"
                value={`-$${discount.toFixed(
                  2,
                )}`}
                discount
              />

              <SummaryRow
                label="Delivery Fee"
                value={`$${deliveryFee.toFixed(
                  2,
                )}`}
              />

              <SummaryRow
                label="Tax"
                value={`$${tax.toFixed(
                  2,
                )}`}
              />
            </div>

            <div className="my-[20px] h-px bg-black/10" />

            <div className="flex items-center justify-between">
              <span className="text-[17px] font-bold text-black">
                Total
              </span>

              <span className="text-[25px] font-bold text-black">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="my-[20px] h-px bg-black/10" />

            {/* BENEFITS */}
            <div className="space-y-[17px]">
              <Benefit
                icon={
                  <LockKeyhole className="size-[18px]" />
                }
                title="Secure Checkout"
                description="Your information is protected."
              />

              <Benefit
                icon={
                  <RotateCcw className="size-[18px]" />
                }
                title="Easy Returns"
                description="Return within 30 days of delivery."
              />

              <Benefit
                icon={
                  <Headphones className="size-[18px]" />
                }
                title="24/7 Support"
                description="We're here to help you anytime."
              />
            </div>

            <p
              className="
                mt-[24px]
                text-[12px]
                leading-[19px]
                text-black/60
              "
            >
              By placing your order, you
              agree to our{" "}
              <span className="text-black underline underline-offset-2">
                Terms &amp; Conditions
              </span>{" "}
              and{" "}
              <span className="text-black underline underline-offset-2">
                Privacy Policy
              </span>
              .
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  label,
  value,
  discount = false,
}: {
  label: string;
  value: string;
  discount?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-[16px]">
      <span className="text-[14px] text-black">
        {label}
      </span>

      <span
        className={`
          text-[14px]
          font-medium

          ${
            discount
              ? "text-[#16803C]"
              : "text-black"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}

function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-[12px]">
      <div
        className="
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center

          rounded-[8px]
          border
          border-black/10
        "
      >
        {icon}
      </div>

      <div>
        <p className="text-[13px] font-semibold text-black">
          {title}
        </p>

        <p className="mt-[2px] text-[12px] text-black/50">
          {description}
        </p>
      </div>
    </div>
  );
}