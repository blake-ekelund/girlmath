"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  Sparkles,
  Plane,
  Heart,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Nav from "../components/Nav";

const calculators = [
  {
    title: "Basically Free",
    description: "Already paid for it in your head? This confirms it.",
    icon: Sparkles,
    href: "/calculators/basically-free",
  },
  {
    title: "Cost Per Use",
    description: "Divide the price until it becomes responsible.",
    icon: Calculator,
    href: "/calculators/cost-per-use",
  },
  {
    title: "Cost & Compliments",
    description: "Compliments are a currency. Let’s price them.",
    icon: MessageCircle,
    href: "/calculators/cost-and-compliments",
  },
  {
    title: "Travel Math",
    description: "Memories are priceless. Flights are temporary.",
    icon: Plane,
    href: "/calculators/travel-math",
  },
  {
    title: "Self-Care Math",
    description: "Mental health has no budget cap.",
    icon: Heart,
    href: "/calculators/self-care",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <Nav />

      <main className="max-w-md mx-auto px-4 pt-24 pb-16 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            Choose your math
          </h1>
          <p className="text-zinc-600 text-lg">
            Pick the logic you need to feel better about this purchase.
          </p>
        </motion.div>

        {/* Calculator Cards */}
        <div className="space-y-4">
          {calculators.map((calc, i) => {
            const Icon = calc.icon;

            return (
              <motion.div
                key={calc.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={calc.href}
                  className="
                    block rounded-2xl
                    border border-black/10
                    bg-white p-5
                    hover:bg-[#FAEB92]
                    hover:border-black/20
                    transition
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-white p-3 border border-black/10">
                      <Icon className="h-5 w-5 text-[#9929EA]" />
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold text-[#000000]">
                        {calc.title}
                      </h2>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-zinc-500 pt-6"
        >
          <span className="text-[#FF5FCF] font-medium">
            Results are always correct.
          </span>
          <br />
          Emotionally.
        </motion.div>
      </main>
    </div>
  );
}
