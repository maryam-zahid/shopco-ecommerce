"use client";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";

type Props = {
  images: string[];
  productName: string;
};

export default function AdminProductGallery({
  images,
  productName,
}: Props) {
  const safeImages =
    images.length > 0
      ? images
      : [];

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  function previousImage() {
    if (safeImages.length === 0) {
      return;
    }

    setSelectedIndex(
      (current) =>
        current === 0
          ? safeImages.length - 1
          : current - 1,
    );
  }

  function nextImage() {
    if (safeImages.length === 0) {
      return;
    }

    setSelectedIndex(
      (current) =>
        current ===
        safeImages.length - 1
          ? 0
          : current + 1,
    );
  }

  return (
    <div className="w-full">
      <div
        className="
          relative

          aspect-[465/465]
          w-full

          overflow-hidden

          rounded-[10px]

          bg-[#F0EEED]
        "
      >
        {safeImages.length > 0 ? (
          <Image
            src={
              safeImages[
                selectedIndex
              ]
            }
            alt={productName}
            fill
            priority
            sizes="465px"
            className="object-contain"
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center

              text-[13px]
              text-black/40
            "
          >
            No product image
          </div>
        )}

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={
                previousImage
              }
              aria-label="Previous image"
              className="
                absolute
                left-[12px]
                top-1/2

                flex
                h-[44px]
                w-[44px]
                -translate-y-1/2
                items-center
                justify-center

                rounded-full

                bg-white/80

                text-black

                backdrop-blur-sm
              "
            >
              <ChevronLeft className="size-[30px]" />
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="
                absolute
                right-[12px]
                top-1/2

                flex
                h-[44px]
                w-[44px]
                -translate-y-1/2
                items-center
                justify-center

                rounded-full

                bg-white/80

                text-black

                backdrop-blur-sm
              "
            >
              <ChevronRight className="size-[30px]" />
            </button>
          </>
        )}
      </div>

      {safeImages.length > 0 && (
        <div
          className="
            mt-[14px]

            grid
            grid-cols-4
            gap-[12px]
          "
        >
          {safeImages
            .slice(0, 4)
            .map(
              (
                image,
                index,
              ) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      index,
                    )
                  }
                  className="
                    relative

                    aspect-square

                    overflow-hidden

                    rounded-[8px]

                    bg-[#F0EEED]
                  "
                  style={{
                    border:
                      selectedIndex ===
                      index
                        ? "1.5px solid #111111"
                        : "1px solid #E1E1E5",
                  }}
                >
                  <Image
                    src={image}
                    alt={`${productName} ${index + 1}`}
                    fill
                    sizes="110px"
                    className="object-contain"
                  />
                </button>
              ),
            )}
        </div>
      )}
    </div>
  );
}