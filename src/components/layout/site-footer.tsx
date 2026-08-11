import Link from "next/link";

/* =========================================================
   SOCIAL ICONS
========================================================= */

function TwitterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[14px] w-[14px]"
    >
      <path
        fill="currentColor"
        d="M18.9 7.1v.5c0 5-3.8 10.7-10.7 10.7-2.1 0-4.1-.6-5.8-1.7h.9c1.8 0 3.4-.6 4.7-1.6-1.7 0-3.1-1.1-3.6-2.6.2 0 .5.1.7.1.3 0 .7 0 1-.1-1.8-.4-3.1-1.9-3.1-3.8v-.1c.5.3 1.1.5 1.7.5-1-.7-1.7-1.9-1.7-3.2 0-.7.2-1.4.5-2 1.9 2.3 4.7 3.9 7.9 4.1-.1-.3-.1-.6-.1-.9 0-2.1 1.7-3.9 3.9-3.9 1.1 0 2.1.5 2.8 1.2.9-.2 1.7-.5 2.5-.9-.3.9-.9 1.6-1.7 2 .8-.1 1.5-.3 2.2-.6-.6.9-1.2 1.6-2 2.3Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
    >
      <path
        fill="#FFFFFF"
        d="M13.5 8H16V5H13.5C10.9 5 9.5 6.6 9.5 9.1V11H7V14H9.5V21H12.7V14H15.4L15.9 11H12.7V9.3C12.7 8.4 13 8 13.5 8Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="12"
        cy="12"
        r="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      <path
        fill="currentColor"
        d="M12 2.5A9.5 9.5 0 0 0 9 21c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.6 4.7.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"
      />
    </svg>
  );
}

/* =========================================================
   SOCIAL BUTTON
========================================================= */
function SocialButton({
  href,
  label,
  children,
  black = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  black?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`
        flex
        h-[30px]
        w-[30px]
        items-center
        justify-center
        rounded-full
        border
        border-black/20
        no-underline

        ${
          black
            ? "bg-black text-white"
            : "bg-white text-black"
        }
      `}
    >
      {children}
    </Link>
  );
}
/* =========================================================
   FOOTER DATA
========================================================= */

const footerGroups = [
  {
    title: "COMPANY",
    links: [
      "About",
      "Features",
      "Works",
      "Career",
    ],
  },

  {
    title: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },

  {
    title: "FAQ",
    links: [
      "Account",
      "Manage Deliveries",
      "Orders",
      "Payments",
    ],
  },

  {
    title: "RESOURCES",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];

/* =========================================================
   PAYMENT METHODS
========================================================= */

function PaymentMethods() {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-[8px]

        min-[800px]:gap-[10px]
      "
    >
      {/* VISA */}
      <div
        className="
          flex
          h-[30px]
          w-[46px]
          items-center
          justify-center
          rounded-[5px]
          bg-white
          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        "
      >
        <span
          className="
            text-[11px]
            font-black
            italic
            text-[#1A1F71]
          "
        >
          VISA
        </span>
      </div>

      {/* MASTERCARD */}
      <div
        className="
          flex
          h-[30px]
          w-[46px]
          items-center
          justify-center
          rounded-[5px]
          bg-white
          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        "
      >
        <div className="flex">
          <span
            className="
              h-[14px]
              w-[14px]
              rounded-full
              bg-[#EB001B]
            "
          />

          <span
            className="
              -ml-[5px]
              h-[14px]
              w-[14px]
              rounded-full
              bg-[#F79E1B]
            "
          />
        </div>
      </div>

      {/* PAYPAL */}
      <div
        className="
          flex
          h-[30px]
          w-[46px]
          items-center
          justify-center
          rounded-[5px]
          bg-white
          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        "
      >
        <span
          className="
            text-[9px]
            font-bold
            italic
            text-[#003087]
          "
        >
          PayPal
        </span>
      </div>

      {/* APPLE PAY */}
      <div
        className="
          flex
          h-[30px]
          w-[46px]
          items-center
          justify-center
          rounded-[5px]
          bg-white
          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        "
      >
        <span
          className="
            whitespace-nowrap
            text-[9px]
            font-semibold
            text-black
          "
        >
           Pay
        </span>
      </div>

      {/* GOOGLE PAY */}
      <div
        className="
          flex
          h-[30px]
          w-[46px]
          items-center
          justify-center
          rounded-[5px]
          bg-white
          shadow-[0_1px_4px_rgba(0,0,0,0.08)]
        "
      >
        <span
          className="
            whitespace-nowrap
            text-[9px]
            font-semibold
            text-black
          "
        >
          <span className="text-[#4285F4]">G</span>
          <span className="ml-[2px]">Pay</span>
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SITE FOOTER
========================================================= */

export default function SiteFooter() {
  return (
    <footer
      className="
        w-full
        bg-[#F0F0F0]
      "
    >
      <div
        className="
          mx-auto
          w-full
          px-[16px]
          pt-[32px]
          pb-[24px]

          min-[800px]:px-[32px]
          min-[800px]:pt-[48px]
          min-[800px]:pb-[30px]

          min-[1920px]:max-w-[1440px]
          min-[1920px]:px-[100px]
          min-[1920px]:pt-[50px]
          min-[1920px]:pb-[38px]
        "
      >
        {/* =================================================
            TOP FOOTER AREA
        ================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-[24px]
            gap-y-[32px]

            min-[800px]:grid-cols-3
            min-[800px]:gap-x-[40px]

            min-[1200px]:grid-cols-[250px_repeat(4,1fr)]
            min-[1200px]:gap-x-[55px]

            min-[1920px]:grid-cols-[248px_repeat(4,1fr)]
            min-[1920px]:gap-x-[70px]
          "
        >
          {/* =================================================
              SHOP.CO COLUMN
          ================================================== */}

          <div
            className="
              col-span-2

              min-[800px]:col-span-1
            "
          >
            <Link
              href="/"
              className="
                inline-block
                text-[29px]
                leading-[29px]
                tracking-[-1px]
                text-black
                no-underline

                min-[800px]:text-[32px]
                min-[800px]:leading-[32px]

                min-[1920px]:text-[33.45px]
                min-[1920px]:leading-[34px]
              "
              style={{
                fontFamily:
                  '"Arial Black", Arial, sans-serif',
                fontWeight: 900,
              }}
            >
              SHOP.CO
            </Link>

            <p
              className="
                m-0
                mt-[14px]
                max-w-[357px]

                text-[14px]
                leading-[20px]
                tracking-[0]
                text-black/60

                min-[800px]:max-w-[250px]

                min-[1920px]:mt-[25px]
                min-[1920px]:max-w-[248px]
                min-[1920px]:leading-[22px]
              "
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 400,
              }}
            >
              We have clothes that suits your style and
              which you&apos;re proud to wear. From women
              to men.
            </p>

            {/* SOCIAL ICONS */}

          <div
  className="
    mt-[20px]
    flex
    items-center
    gap-[12px]

    min-[1920px]:mt-[35px]
  "
>
  <SocialButton
    href="#"
    label="Twitter"
  >
    <TwitterIcon />
  </SocialButton>

  <SocialButton
    href="#"
    label="Facebook"
    black
  >
    <FacebookIcon />
  </SocialButton>

  <SocialButton
    href="#"
    label="Instagram"
  >
    <InstagramIcon />
  </SocialButton>

  <SocialButton
    href="#"
    label="GitHub"
  >
    <GithubIcon />
  </SocialButton>
</div>  
          </div>

          {/* =================================================
              FOOTER LINK GROUPS
          ================================================== */}

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3
                className="
                  m-0

                  text-[14px]
                  leading-[18px]
                  tracking-[3px]
                  text-black

                  min-[800px]:text-[16px]
                  min-[800px]:leading-[18px]
                "
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 500,
                }}
              >
                {group.title}
              </h3>

              <ul
                className="
                  m-0
                  mt-[16px]
                  list-none
                  space-y-[12px]
                  p-0

                  min-[800px]:mt-[20px]
                  min-[800px]:space-y-[16px]

                  min-[1920px]:mt-[26px]
                  min-[1920px]:space-y-[18px]
                "
              >
                {group.links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="
                        block
                        whitespace-nowrap

                        text-[14px]
                        leading-[19px]
                        text-black/60
                        no-underline

                        transition-colors
                        hover:text-black

                        min-[800px]:text-[16px]
                      "
                      style={{
                        fontFamily: "var(--font-satoshi)",
                        fontWeight: 400,
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* =================================================
            DIVIDER
        ================================================== */}

        <div
          className="
            mt-[40px]
            h-px
            w-full
            bg-black/10

            min-[800px]:mt-[50px]
          "
        />

        {/* =================================================
            BOTTOM
        ================================================== */}

        <div
          className="
            pt-[16px]

          min-[800px]:flex
  min-[800px]:items-center
  min-[800px]:justify-between
  min-[800px]:pt-[20px]
          "
        >
          <p
            className="
              m-0
              text-center
              text-[14px]
              leading-[19px]
              text-black/60

              min-[800px]:text-left
            "
            style={{
              fontFamily: "var(--font-satoshi)",
              fontWeight: 400,
            }}
          >
            Shop.co © 2000-2023, All Rights Reserved
          </p>

          <div
            className="
              mt-[16px]
              flex
              justify-center

              min-[800px]:mt-0
            "
          >
            <PaymentMethods />
          </div>
        </div>
      </div>
    </footer>
  );
}