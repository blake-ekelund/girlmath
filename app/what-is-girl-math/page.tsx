"use client";

import { motion } from "framer-motion";
import { Sparkles, Calculator } from "lucide-react";
import Nav from "../components/Nav";
import Link from "next/link";

export default function WhatIsGirlMathPage() {
  return (
    <div className="min-h-screen bg-zinc-50 relative">
      <Nav />

      <main className="max-w-md mx-auto px-4 pt-24 pb-16 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-zinc-900">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              girl math
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            What is girl math?
          </h1>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="space-y-6 text-zinc-700 text-lg leading-relaxed"
        >
          <p>
            Girl math is the art of reframing a purchase until it feels
            financially responsible.
          </p>

          <p>
            It’s not about being bad at math. It’s about using math to protect
            your peace.
          </p>

          <p>
            If something was on sale, it was basically free. If you’ll use it a
            lot, it’s an investment. If it makes you happy, it doesn’t count.
          </p>

          <p>
            Girl math doesn’t ask <em>“Can I afford this?”</em>
            <br />
            It asks <em>“Will this improve my quality of life immediately?”</em>
          </p>

          <p className="font-medium text-zinc-900">
            And the answer is usually yes.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-6"
        >
          <Link
            href="/calculators"
            className="w-full rounded-full bg-black text-white py-4 text-lg font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
          >
            <Calculator className="h-5 w-5" />
            Do the Girl Math
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
