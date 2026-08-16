"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  FormEvent,
  useState,
  useTransition,
} from "react";

import {
  loginAction,
  registerAction,
} from "@/actions/auth.actions";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({
  mode,
}: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
const isLogin = mode === "login";

const callbackUrl =
  searchParams.get("callbackUrl") ?? "/";

  const isCheckoutLogin =
  isLogin && callbackUrl === "/checkout";

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] = useState<
    string | null
  >(null);

  const [isError, setIsError] =
    useState(false);

  const [isPending, startTransition] =
    useTransition();


  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData(
      event.currentTarget,
    );

    setMessage(null);
    setIsError(false);

    startTransition(async () => {
      const result = isLogin
        ? await loginAction(formData)
        : await registerAction(formData);

      if (!result.success) {
        setIsError(true);
        setMessage(result.message);
        return;
      }

      setIsError(false);
      setMessage(result.message);
if (isLogin) {
  router.push(callbackUrl);
  router.refresh();
  return;
}

      router.push(
        "/login?registered=true",
      );
    });
  }

  return (
    <div className="w-full">
      <div className="mb-[32px]">
        <Link
          href="/"
          className="
            inline-block
            text-[32px]
            leading-none
            font-black
            tracking-[-0.05em]
            text-black

            min-[800px]:text-[36px]
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          SHOP.CO
        </Link>

        <h1
          className="
            mt-[38px]
            text-[30px]
            leading-[38px]
            font-bold
            tracking-[-0.03em]
            text-black

            min-[800px]:text-[36px]
            min-[800px]:leading-[44px]
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          {isLogin
            ? "Welcome back"
            : "Create your account"}
        </h1>

        <p
          className="
            mt-[10px]
            max-w-[420px]
            text-[15px]
            leading-[24px]
            text-black/60
          "
          style={{
            fontFamily:
              "var(--font-satoshi)",
          }}
        >
          {isLogin
            ? "Enter your details to access your SHOP.CO account."
            : "Create an account to checkout, manage orders and save your details."}
        </p>
      </div>
{/* /////////// */}
{isCheckoutLogin && (
  <div
    className="
      mb-[22px]
      rounded-[12px]
      border
      border-black/10
      bg-[#F5F5F5]
      px-[16px]
      py-[14px]

      text-[14px]
      leading-[21px]
      text-black
    "
    style={{
      fontFamily: "var(--font-satoshi)",
      fontWeight: 500,
    }}
  >
    Please login or create an account to continue to checkout.
  </div>
)}
      <form
        onSubmit={handleSubmit}
        className="space-y-[18px]"
      >
        {!isLogin && (
          <div>
            <label
              htmlFor="name"
              className="
                mb-[8px]
                block
                text-[14px]
                font-medium
                text-black
              "
            >
              Full name
            </label>

            <div className="relative">
              <User
                className="
                  absolute
                  left-[16px]
                  top-1/2
                  size-[18px]
                  -translate-y-1/2
                  text-black/40
                "
              />

              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="
                  h-[52px]
                  w-full
                  rounded-[12px]
                  border
                  border-black/10
                  bg-[#F8F8F8]
                  pl-[46px]
                  pr-[16px]
                  text-[15px]
                  text-black
                  outline-none
                  transition

                  placeholder:text-black/35

                  focus:border-black/35
                  focus:bg-white
                "
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="
              mb-[8px]
              block
              text-[14px]
              font-medium
              text-black
            "
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              className="
                absolute
                left-[16px]
                top-1/2
                size-[18px]
                -translate-y-1/2
                text-black/40
              "
            />

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="
                h-[52px]
                w-full
                rounded-[12px]
                border
                border-black/10
                bg-[#F8F8F8]
                pl-[46px]
                pr-[16px]
                text-[15px]
                text-black
                outline-none
                transition

                placeholder:text-black/35

                focus:border-black/35
                focus:bg-white
              "
            />
          </div>
        </div>

        <div>
          <div
            className="
              mb-[8px]
              flex
              items-center
              justify-between
            "
          >
            <label
              htmlFor="password"
              className="
                text-[14px]
                font-medium
                text-black
              "
            >
              Password
            </label>
          </div>

          <div className="relative">
            <LockKeyhole
              className="
                absolute
                left-[16px]
                top-1/2
                size-[18px]
                -translate-y-1/2
                text-black/40
              "
            />

            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              minLength={
                isLogin
                  ? undefined
                  : 8
              }
              autoComplete={
                isLogin
                  ? "current-password"
                  : "new-password"
              }
              placeholder={
                isLogin
                  ? "Enter your password"
                  : "Minimum 8 characters"
              }
              className="
                h-[52px]
                w-full
                rounded-[12px]
                border
                border-black/10
                bg-[#F8F8F8]
                pl-[46px]
                pr-[48px]
                text-[15px]
                text-black
                outline-none
                transition

                placeholder:text-black/35

                focus:border-black/35
                focus:bg-white
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) =>
                    !current,
                )
              }
              className="
                absolute
                right-[15px]
                top-1/2
                flex
                -translate-y-1/2
                items-center
                justify-center
                text-black/45
                transition
                hover:text-black
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" />
              ) : (
                <Eye className="size-[18px]" />
              )}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`
              rounded-[10px]
              border
              px-[14px]
              py-[11px]
              text-[13px]
              leading-[20px]

              ${
                isError
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }
            `}
          >
            {message}
          </div>
        )}

        <button
  type="submit"
  disabled={isPending}
  className="
    mt-[4px]
    flex
    h-[52px]
    w-full
    items-center
    justify-center
    gap-[10px]
    rounded-[10px]

    !border
    !border-black
    !bg-black
    !text-white

    px-[20px]
    text-[15px]
    font-medium

    transition-all
    duration-200

    hover:!bg-[#1a1a1a]
    hover:!text-white

    active:scale-[0.99]

    disabled:cursor-not-allowed
    disabled:opacity-50
  "
  style={{
    fontFamily: "var(--font-satoshi)",
    backgroundColor: "#000000",
    color: "#ffffff",
    borderColor: "#000000",
  }}
>
  {isPending
    ? isLogin
      ? "Signing in..."
      : "Creating account..."
    : isLogin
      ? "Sign in"
      : "Create account"}

  {!isPending && (
    <ArrowRight
      className="size-[18px]"
      strokeWidth={2}
    />
  )}
</button>
      </form>

      <div
        className="
          relative
          my-[28px]
          flex
          items-center
        "
      >
        <div className="h-px flex-1 bg-black/10" />

        <span
          className="
            px-[14px]
            text-[12px]
            text-black/40
          "
        >
          SHOP.CO
        </span>

        <div className="h-px flex-1 bg-black/10" />
      </div>

      <p
        className="
          text-center
          text-[14px]
          text-black/60
        "
      >
        {isLogin
          ? "New to SHOP.CO?"
          : "Already have an account?"}{" "}
        <Link
          href={
            isLogin
              ? "/register"
              : "/login"
          }
          className="
            font-semibold
            text-black
            underline
            underline-offset-4
          "
        >
          {isLogin
            ? "Create account"
            : "Sign in"}
        </Link>
      </p>

      <p
        className="
          mt-[26px]
          text-center
          text-[12px]
          leading-[19px]
          text-black/40
        "
      >
        By continuing, you agree to
        SHOP.CO&apos;s Terms of Service and
        Privacy Policy.
      </p>
    </div>
  );
}