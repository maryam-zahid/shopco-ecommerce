// import Link from "next/link";

// import { signIn } from "@/auth";

// export default function LoginPage() {
//   async function login(formData: FormData) {
//     "use server";

//     await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirectTo: "/",
//     });
//   }

//   return (
//     <main className="min-h-screen bg-white px-4 py-16">
//       <div className="mx-auto w-full max-w-[440px]">
//         <h1
//           className="text-[32px] font-bold text-black"
//           style={{
//             fontFamily: "var(--font-satoshi)",
//           }}
//         >
//           Login
//         </h1>

//         <p
//           className="mt-2 text-[15px] text-black/60"
//           style={{
//             fontFamily: "var(--font-satoshi)",
//           }}
//         >
//           Login to continue to your SHOP.CO account.
//         </p>

//         <form action={login} className="mt-8 space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-[14px] font-medium text-black"
//             >
//               Email
//             </label>

//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               autoComplete="email"
//               className="
//                 h-[48px]
//                 w-full
//                 rounded-[10px]
//                 border
//                 border-black/15
//                 px-4
//                 outline-none
//                 focus:border-black
//               "
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-[14px] font-medium text-black"
//             >
//               Password
//             </label>

//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               autoComplete="current-password"
//               className="
//                 h-[48px]
//                 w-full
//                 rounded-[10px]
//                 border
//                 border-black/15
//                 px-4
//                 outline-none
//                 focus:border-black
//               "
//             />
//           </div>

//           <button
//             type="submit"
//             className="
//               h-[48px]
//               w-full
//               rounded-full
//               bg-black
//               text-[15px]
//               font-medium
//               text-white
//             "
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-[14px] text-black/60">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="font-medium text-black underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }
import { redirect } from "next/navigation";

import AuthForm from "@/components/auth/auth-form";
import { auth } from "@/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    }

    redirect("/");
  }

  return (
    <main
      className="
        min-h-screen
        bg-white

        min-[1000px]:grid
        min-[1000px]:grid-cols-[0.9fr_1.1fr]
      "
    >
      <section
        className="
          hidden
          min-h-screen
          overflow-hidden
          bg-black
          px-[56px]
          py-[64px]
          text-white

          min-[1000px]:flex
          min-[1000px]:flex-col
          min-[1000px]:justify-between

          min-[1400px]:px-[80px]
        "
      >
        <div>
          <div
            className="
              text-[36px]
              font-black
              tracking-[-0.05em]
            "
            style={{
              fontFamily:
                "var(--font-satoshi)",
            }}
          >
            SHOP.CO
          </div>

          <div className="mt-[110px] max-w-[520px]">
            <p
              className="
                text-[52px]
                leading-[58px]
                font-bold
                tracking-[-0.045em]
              "
              style={{
                fontFamily:
                  "var(--font-satoshi)",
              }}
            >
              Find clothes that match
              your style.
            </p>

            <p
              className="
                mt-[22px]
                max-w-[440px]
                text-[16px]
                leading-[27px]
                text-white/60
              "
            >
              Sign in to continue shopping,
              manage your orders and enjoy a
              faster checkout experience.
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-3
            gap-[24px]
            border-t
            border-white/15
            pt-[28px]
          "
        >
          <div>
            <p className="text-[24px] font-bold">
              200+
            </p>
            <p className="mt-1 text-[12px] text-white/50">
              International brands
            </p>
          </div>

          <div>
            <p className="text-[24px] font-bold">
              2,000+
            </p>
            <p className="mt-1 text-[12px] text-white/50">
              Quality products
            </p>
          </div>

          <div>
            <p className="text-[24px] font-bold">
              30,000+
            </p>
            <p className="mt-1 text-[12px] text-white/50">
              Happy customers
            </p>
          </div>
        </div>
      </section>

      <section
        className="
          flex
          min-h-screen
          items-center
          justify-center
          px-[20px]
          py-[50px]

          min-[800px]:px-[60px]

          min-[1200px]:px-[100px]
        "
      >
        <div className="w-full max-w-[470px]">
          <AuthForm mode="login" />
        </div>
      </section>
    </main>
  );
}