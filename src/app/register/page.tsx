// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { prisma } from "@/lib/prisma";
// import { hashPassword } from "@/lib/password";
// import { registerSchema } from "@/validations/auth.schema";

// export default function RegisterPage() {
//   async function register(formData: FormData) {
//     "use server";

//     const parsed = registerSchema.safeParse({
//       name: formData.get("name"),
//       email: formData.get("email"),
//       password: formData.get("password"),
//     });

//     if (!parsed.success) {
//       return;
//     }

//     const { name, email, password } = parsed.data;

//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//       select: {
//         id: true,
//       },
//     });

//     if (existingUser) {
//       redirect("/login");
//     }

//     const passwordHash = await hashPassword(password);

//     await prisma.user.create({
//       data: {
//         name,
//         email,
//         passwordHash,

//         // Public users can NEVER register as ADMIN.
//         role: "CUSTOMER",

//         isActive: true,
//       },
//     });

//     redirect("/login");
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
//           Create Account
//         </h1>

//         <p
//           className="mt-2 text-[15px] text-black/60"
//           style={{
//             fontFamily: "var(--font-satoshi)",
//           }}
//         >
//           Create your SHOP.CO customer account.
//         </p>

//         <form action={register} className="mt-8 space-y-4">
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-[14px] font-medium"
//             >
//               Name
//             </label>

//             <input
//               id="name"
//               name="name"
//               required
//               autoComplete="name"
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
//               htmlFor="email"
//               className="mb-2 block text-[14px] font-medium"
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
//               className="mb-2 block text-[14px] font-medium"
//             >
//               Password
//             </label>

//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               minLength={8}
//               autoComplete="new-password"
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
//             Create Account
//           </button>
//         </form>

//         <p className="mt-6 text-center text-[14px] text-black/60">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="font-medium text-black underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }

import { redirect } from "next/navigation";

import AuthForm from "@/components/auth/auth-form";
import { auth } from "@/auth";

export default async function RegisterPage() {
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
              Your style. Your account.
              Your SHOP.CO.
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
              Create your customer account
              to checkout securely, manage
              addresses and keep track of
              your orders.
            </p>
          </div>
        </div>

        <div
          className="
            rounded-[24px]
            border
            border-white/10
            bg-white/[0.06]
            p-[28px]
          "
        >
          <p
            className="
              text-[18px]
              font-semibold
            "
          >
            One account for everything.
          </p>

          <p
            className="
              mt-[8px]
              text-[14px]
              leading-[23px]
              text-white/55
            "
          >
            Browse freely, then sign in when
            you&apos;re ready to checkout.
            Your account keeps your orders
            and delivery details together.
          </p>
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
          <AuthForm mode="register" />
        </div>
      </section>
    </main>
  );
}