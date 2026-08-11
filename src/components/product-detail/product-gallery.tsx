"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div
      className="
        w-full

        min-[1200px]:grid
        min-[1200px]:grid-cols-[152px_444px]
        min-[1200px]:gap-[14px]
      "
    >
      {/* =================================================
          MOBILE / TABLET MAIN IMAGE
      ================================================== */}

      <div
        className="
          relative
          h-[290px]
          w-full
          overflow-hidden
          rounded-[20px]
          bg-[#F0EEED]

          min-[800px]:h-[430px]

          min-[1200px]:hidden
        "
      >
       <Image
  src={images[selectedImage]}
  alt={productName}
  fill
  priority
  sizes="(max-width: 799px) calc(100vw - 32px), (max-width: 1199px) calc(100vw - 64px), 444px"
  className="object-contain"
/>
      </div>

      {/* =================================================
          MOBILE / TABLET THUMBNAILS
      ================================================== */}

      <div
        className="
          mt-[12px]
          grid
          grid-cols-3
          gap-[12px]

          min-[1200px]:hidden
        "
      >
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`
              relative
              h-[106px]
              min-w-0
              overflow-hidden
              rounded-[20px]
              bg-[#F0EEED]

              ${
                selectedImage === index
                  ? "border border-black"
                  : "border border-transparent"
              }
            `}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              sizes="112px"
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* =================================================
          DESKTOP THUMBNAILS
      ================================================== */}

      <div
        className="
          hidden

          min-[1200px]:flex
          min-[1200px]:flex-col
          min-[1200px]:gap-[14px]
        "
      >
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`
              relative
              h-[167px]
              w-[152px]
              shrink-0
              overflow-hidden
              rounded-[20px]
              bg-[#F0EEED]

              ${
                selectedImage === index
                  ? "border border-black"
                  : "border border-transparent"
              }
            `}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              sizes="152px"
              className="object-contain"
            />
          </button>
        ))}
      </div>

      {/* =================================================
          DESKTOP MAIN IMAGE
      ================================================== */}

      <div
        className="
          relative
          hidden

          min-[1200px]:block
          min-[1200px]:h-[530px]
          min-[1200px]:w-[444px]
          min-[1200px]:overflow-hidden
          min-[1200px]:rounded-[20px]
          min-[1200px]:bg-[#F0EEED]
        "
      >
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          priority
          sizes="444px"
          className="object-contain"
        />
      </div>
    </div>
  );
}