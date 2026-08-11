import Image from "next/image";

type BrandLogo = {
  name: string;
  src: string;
  desktopWidth: number;
  desktopHeight: number;
  mobileWidth: number;
  mobileHeight: number;
};

const brandLogos: BrandLogo[] = [
  {
    name: "Versace",
    src: "/icons/brands/versace.svg",
    desktopWidth: 166,
    desktopHeight: 34,
    mobileWidth: 117,
    mobileHeight: 23,
  },
  {
    name: "Zara",
    src: "/icons/brands/zara.svg",
    desktopWidth: 91,
    desktopHeight: 38,
    mobileWidth: 64,
    mobileHeight: 27,
  },
  {
    name: "Gucci",
    src: "/icons/brands/gucci.svg",
    desktopWidth: 156,
    desktopHeight: 36,
    mobileWidth: 109,
    mobileHeight: 25,
  },
  {
    name: "Prada",
    src: "/icons/brands/prada.svg",
    desktopWidth: 194,
    desktopHeight: 32,
    mobileWidth: 127,
    mobileHeight: 21,
  },
  {
    name: "Calvin Klein",
    src: "/icons/brands/calvin-klein.svg",
    desktopWidth: 207,
    desktopHeight: 34,
    mobileWidth: 135,
    mobileHeight: 24,
  },
];

function BrandImage({
  brand,
  mobile = false,
}: {
  brand: BrandLogo;
  mobile?: boolean;
}) {
  const width = mobile ? brand.mobileWidth : brand.desktopWidth;
  const height = mobile ? brand.mobileHeight : brand.desktopHeight;

  return (
    <Image
      src={brand.src}
      alt={brand.name}
      width={width}
      height={height}
      className="block shrink-0 object-contain"
    />
  );
}

export default function BrandStrip() {
  return (
    <section
      id="brands"
      className="
        flex
        h-[146px]
        w-full
        items-center
        justify-center
        bg-black

        min-[800px]:h-[122px]
      "
    >
      {/* =====================================================
          MOBILE
          0px - 799px
      ====================================================== */}

      <div
        className="
          flex
          h-[146px]
          w-[390px]
          flex-col
          items-center
          justify-center
          gap-[18px]
          px-[16px]

          min-[800px]:hidden
        "
      >
        {/* FIRST ROW */}
        <div
          className="
            flex
            w-full
            items-center
            justify-between
          "
        >
          <BrandImage brand={brandLogos[0]} mobile />
          <BrandImage brand={brandLogos[1]} mobile />
          <BrandImage brand={brandLogos[2]} mobile />
        </div>

        {/* SECOND ROW */}
        <div
          className="
            flex
            w-[295px]
            items-center
            justify-between
          "
        >
          <BrandImage brand={brandLogos[3]} mobile />
          <BrandImage brand={brandLogos[4]} mobile />
        </div>
      </div>

      {/* =====================================================
          TABLET + DESKTOP
      ====================================================== */}

      <div
        className="
          mx-auto
          hidden
          h-full
          w-full
          items-center
          justify-between

          min-[800px]:flex
          min-[800px]:px-[32px]
          min-[800px]:gap-[18px]

          min-[1200px]:px-[56px]
          min-[1200px]:gap-[28px]

          min-[1440px]:max-w-[1440px]
          min-[1440px]:px-[72px]
          min-[1440px]:gap-[40px]
        "
      >
        {brandLogos.map((brand) => (
          <BrandImage key={brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
}