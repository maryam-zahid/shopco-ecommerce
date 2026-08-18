import { NextResponse } from "next/server";

import {
  getCurrentCart,
} from "@/services/cart.service";

export async function GET() {
  try {
    const cart =
      await getCurrentCart();

    const count =
      cart?.items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      ) ?? 0;

    return NextResponse.json({
      count,
    });
  } catch {
    return NextResponse.json({
      count: 0,
    });
  }
}