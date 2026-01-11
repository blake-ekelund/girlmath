"use client";

import { motion } from "framer-motion";
import { Calculator, Sparkles, Share2 } from "lucide-react";
import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 relative overflow-hidden">
      {/* Nav */}
      <Nav />

      {/* Content */}
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-12">
          {/* Logo / Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="flex items-center justify-center gap-2 text-zinc-900">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                girl math
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
              Check your math.
              <br />
              Respectfully.
            </h1>

            <p className="text-zinc-600 text-lg">
              Fun calculators for validating purchases you were already going to
              make.
            </p>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="/calculators"
              className="w-full rounded-full bg-black text-white py-4 text-lg font-medium flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
            >
              <Calculator className="h-5 w-5" />
              Do the Girl Math
            </Link>
          </motion.div>

          {/* Secondary cues */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-8 text-sm text-zinc-500"
          >
            <span className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              Basically free
            </span>
            <span className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Screenshot-ready
            </span>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
