"use client";

import {
  useEffect,
} from "react";

export default function InvoiceAutoPrint() {
  useEffect(() => {
    async function printWhenReady() {
      const images =
        Array.from(
          document.images,
        );

      await Promise.all(
        images.map(
          (image) =>
            new Promise<void>(
              (resolve) => {
                if (
                  image.complete
                ) {
                  resolve();

                  return;
                }

                image.addEventListener(
                  "load",
                  () => resolve(),
                  {
                    once: true,
                  },
                );

                image.addEventListener(
                  "error",
                  () => resolve(),
                  {
                    once: true,
                  },
                );
              },
            ),
        ),
      );

      window.setTimeout(
        () => {
          window.print();
        },
        250,
      );
    }

    void printWhenReady();
  }, []);

  return null;
}