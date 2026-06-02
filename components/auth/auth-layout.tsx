"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { AuthIllustration } from "@/components/auth/auth-illustration";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background min-h-screen px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <AuthIllustration />
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex min-h-[560px] items-center"
        >
          <div className="mx-auto w-full max-w-[34rem] min-w-0">{children}</div>
        </motion.section>
      </div>
    </main>
  );
}
