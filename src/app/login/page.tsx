
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

  // return (
  //   <main
  //     className="
  //       min-h-screen
  //       bg-white

  //       min-[1000px]:grid
  //       min-[1000px]:grid-cols-[0.9fr_1.1fr]
  //     "
  //   >
  //     <section
  //       className="
  //         hidden
  //         min-h-screen
  //         overflow-hidden
  //         bg-black
  //         px-[56px]
  //         py-[64px]
  //         text-white

  //         min-[1000px]:flex
  //         min-[1000px]:flex-col
  //         min-[1000px]:justify-between

  //         min-[1400px]:px-[80px]
  //       "
  //     >
  //       <div>
  //         <div
  //           className="
  //             text-[36px]
  //             font-black
  //             tracking-[-0.05em]
  //           "
  //           style={{
  //             fontFamily:
  //               "var(--font-satoshi)",
  //           }}
  //         >
  //           SHOP.CO
  //         </div>

  //         <div className="mt-[110px] max-w-[520px]">
  //           <p
  //             className="
  //               text-[52px]
  //               leading-[58px]
  //               font-bold
  //               tracking-[-0.045em]
  //             "
  //             style={{
  //               fontFamily:
  //                 "var(--font-satoshi)",
  //             }}
  //           >
  //             Find clothes that match
  //             your style.
  //           </p>

  //           <p
  //             className="
  //               mt-[22px]
  //               max-w-[440px]
  //               text-[16px]
  //               leading-[27px]
  //               text-white/60
  //             "
  //           >
  //             Sign in to continue shopping,
  //             manage your orders and enjoy a
  //             faster checkout experience.
  //           </p>
  //         </div>
  //       </div>

  //       <div
  //         className="
  //           grid
  //           grid-cols-3
  //           gap-[24px]
  //           border-t
  //           border-white/15
  //           pt-[28px]
  //         "
  //       >
  //         <div>
  //           <p className="text-[24px] font-bold">
  //             200+
  //           </p>
  //           <p className="mt-1 text-[12px] text-white/50">
  //             International brands
  //           </p>
  //         </div>

  //         <div>
  //           <p className="text-[24px] font-bold">
  //             2,000+
  //           </p>
  //           <p className="mt-1 text-[12px] text-white/50">
  //             Quality products
  //           </p>
  //         </div>

  //         <div>
  //           <p className="text-[24px] font-bold">
  //             30,000+
  //           </p>
  //           <p className="mt-1 text-[12px] text-white/50">
  //             Happy customers
  //           </p>
  //         </div>
  //       </div>
  //     </section>

  //     <section
  //       className="
  //         flex
  //         min-h-screen
  //         items-center
  //         justify-center
  //         px-[20px]
  //         py-[50px]

  //         min-[800px]:px-[60px]

  //         min-[1200px]:px-[100px]
  //       "
  //     >
  //       <div className="w-full max-w-[470px]">
  //         <AuthForm mode="login" />
  //       </div>
  //     </section>
  //   </main>
  // );

return (
  <main
    className="
      flex
      min-h-screen
      w-full
      items-center
      justify-center

      bg-[#F7F7F7]

      px-[16px]
      py-[40px]

      min-[800px]:px-[32px]
      min-[800px]:py-[60px]
    "
  >
    <div
      className="
        w-full
        max-w-[570px]

        rounded-[24px]
        border
        border-black/10
        bg-white

        px-[24px]
        py-[32px]

        shadow-[0_8px_35px_rgba(0,0,0,0.06)]

        min-[800px]:px-[48px]
        min-[800px]:py-[44px]
      "
    >
      <AuthForm mode="login" />
    </div>
  </main>
);
}