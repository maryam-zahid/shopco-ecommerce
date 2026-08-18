import CartPage from "@/components/cart/cart-page";
import { getCurrentCart } from "@/services/cart.service";

export default async function Page() {
  const cart = await getCurrentCart();

  const items =
    cart?.items.map((item) => {
      const product = item.variant.product;

      const basePrice = Number(product.price);

      const productPrice =
        product.discountPrice !== null
          ? Number(product.discountPrice)
          : basePrice;

      const price =
        item.variant.priceOverride !== null
          ? Number(item.variant.priceOverride)
          : productPrice;

      return {
        id: item.id,

        variantId: item.variant.id,

        slug: product.slug,

        name: product.name,

        image:
          product.images[0] ??
          "/images/products/t-shirt-with-tape-details.png",

        size: item.variant.size,

        color: item.variant.colorName,

        price,

        quantity: item.quantity,

        stock: item.variant.stock,
      };
    }) ?? [];

  return <CartPage initialItems={items}
  initialCoupon={
  cart?.coupon
    ? {
        code:
          cart.coupon.code,

        discountType:
          cart.coupon.discountType,

        discountValue:
          Number(
            cart.coupon
              .discountValue,
          ),

        minimumOrderAmount:
          cart.coupon
            .minimumOrderAmount !==
          null
            ? Number(
                cart.coupon
                  .minimumOrderAmount,
              )
            : null,
      }
    : null
} />;
}