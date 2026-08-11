
import Image from "next/image";
import Link from "next/link";

type DressStyle = {
  name: string;
  href: string;
  image: string;
  desktopWidth: "small" | "large";
};

const styles: DressStyle[] = [
  {
    name: "Casual",
    href: "/category/casual",
    image: "/images/dress-style/casual-v2.png",
    desktopWidth: "small",
  },
  {
    name: "Formal",
    href: "/category/formal",
    image: "/images/dress-style/formal-v2.png",
    desktopWidth: "large",
  },
  {
    name: "Party",
    href: "/category/party",
    image: "/images/dress-style/party-v2.png",
    desktopWidth: "large",
  },
  {
    name: "Gym",
    href: "/category/gym",
    image: "/images/dress-style/gym-v2.png",
    desktopWidth: "small",
  },
];

function DressStyleCard({
  style,
}: {
  style: DressStyle;
}) {
  return (
    <Link
      href={style.href}
      className="
        relative
        block
        h-[190px]
        w-full
        overflow-hidden
        rounded-[20px]
        bg-white

        min-[800px]:h-[220px]

        min-[1200px]:h-[289px]
      "
    >
      {/* MOBILE IMAGE */}
      <Image
        src={style.image}
        alt=""
        fill
        sizes="310px"
        className="
          object-fill
          min-[800px]:hidden
        "
      />

      {/* TABLET + DESKTOP IMAGE */}
      <Image
        src={style.image}
        alt=""
        fill
        sizes={
          style.desktopWidth === "small"
            ? "407px"
            : "684px"
        }
        className="
          hidden
          object-fill
          min-[800px]:block
        "
      />

      {/* LABEL */}
      <span
        className="
          absolute
          left-[16px]
          top-[16px]
          z-20

          whitespace-nowrap
          text-[24px]
          leading-[24px]
          text-black

          min-[800px]:left-[28px]
          min-[800px]:top-[20px]
          min-[800px]:text-[30px]
          min-[800px]:leading-[30px]

          min-[1200px]:left-[36px]
          min-[1200px]:top-[25px]
          min-[1200px]:text-[36px]
          min-[1200px]:leading-[36px]
        "
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
        }}
      >
        {style.name}
      </span>
    </Link>
  );
}

export default function BrowseDressStyleSection() {
  const casual = styles[0];
  const formal = styles[1];
  const party = styles[2];
  const gym = styles[3];

  return (
    <section
      className="
        w-full
        bg-white
        pt-[40px]

        min-[800px]:pt-[56px]
        min-[1200px]:pt-[64px]
      "
    >
      <div
        className="
          mx-auto
          w-[calc(100%-32px)]

          rounded-[20px]
          bg-[#F0F0F0]

          px-[24px]
          pt-[40px]
          pb-[20px]

          min-[800px]:px-[32px]
          min-[800px]:pt-[52px]
          min-[800px]:pb-[48px]

          min-[1200px]:h-[866px]
          min-[1200px]:w-[1239px]
          min-[1200px]:max-w-[calc(100%-32px)]
          min-[1200px]:rounded-[40px]
          min-[1200px]:px-[64px]
          min-[1200px]:pt-[70px]
          min-[1200px]:pb-[64px]
        "
      >
        {/* HEADING */}
        <h2
          className="
            mx-auto
            m-0
            w-[246px]

            text-center
            text-[32px]
            leading-[36px]
            text-black

            min-[800px]:w-auto
            min-[800px]:text-[40px]
            min-[800px]:leading-[40px]

            min-[1200px]:w-[687px]
            min-[1200px]:text-[48px]
            min-[1200px]:leading-[48px]
          "
          style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
            fontWeight: 900,
          }}
        >
          BROWSE BY DRESS STYLE
        </h2>

        {/* MOBILE */}
        <div
          className="
            mt-[21px]
            flex
            flex-col
            gap-[16px]

            min-[800px]:hidden
          "
        >
          <DressStyleCard style={casual} />
          <DressStyleCard style={formal} />
          <DressStyleCard style={party} />
          <DressStyleCard style={gym} />
        </div>

        {/* TABLET */}
        <div
          className="
            mt-[40px]
            hidden
            grid-cols-2
            gap-[16px]

            min-[800px]:grid
            min-[1200px]:hidden
          "
        >
          <DressStyleCard style={casual} />
          <DressStyleCard style={formal} />
          <DressStyleCard style={party} />
          <DressStyleCard style={gym} />
        </div>

        {/* DESKTOP */}
        <div
          className="
            mt-[64px]
            hidden

            min-[1200px]:block
          "
        >
          {/* ROW 1 */}
          <div
            className="
              grid
              grid-cols-[407px_684px]
              gap-[20px]
            "
          >
            <DressStyleCard style={casual} />
            <DressStyleCard style={formal} />
          </div>

          {/* ROW 2 */}
          <div
            className="
              mt-[20px]
              grid
              grid-cols-[684px_407px]
              gap-[20px]
            "
          >
            <DressStyleCard style={party} />
            <DressStyleCard style={gym} />
          </div>
        </div>
      </div>
    </section>
  );
}