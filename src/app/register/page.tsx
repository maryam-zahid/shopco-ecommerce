
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
      <AuthForm mode="register" />
    </div>
  </main>
);
}