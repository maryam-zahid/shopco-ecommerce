"use client";

import {
  useEffect,
} from "react";

export default function PrintInvoiceOnLoad() {
  useEffect(() => {
    const timeout =
      window.setTimeout(() => {
        window.print();
      }, 400);

    return () => {
      window.clearTimeout(
        timeout,
      );
    };
  }, []);

  return null;
}