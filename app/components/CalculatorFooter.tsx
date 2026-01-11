"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Calculator, Plane, Heart } from "lucide-react";

const calculators = [
  {
    title: "Basically Free",
    href: "/calculators/basically-free",
    icon: Sparkles,
  },
  {
    title: "Cost Per Use",
    href: "/calculators/cost-per-use",
    icon: Calculator,
  },
  {
    title: "Travel Math",
    href: "/calculators/travel-math",
    icon: Plane,
  },
  {
    title: "Self-Care Math",
    href: "/calculators/self-care",
    icon: Heart,
  },
];

export default function CalculatorFooter({
  current,
}: {
  current?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-16 pt-8 border-t border-black/10 space-y-4"
    >
      <p className="text-center text-sm text-zinc-500">
        Need more reassurance?
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {calculators
          .filter((c) => c.href !== current)
          .map((calc) => {
            const Icon = calc.icon;

            return (
              <Link
                key={calc.href}
                href={calc.href}
                className="
                  flex items-center gap-2
                  rounded-full
                  border border-black/15
                  bg-white
                  px-4 py-2
                  text-sm font-medium text-[#000000]
                  hover:bg-[#FAEB92]
                  hover:border-black/30
                  transition
                "
              >
                <Icon className="h-4 w-4 text-[#9929EA]" />
                {calc.title}
              </Link>
            );
          })}
      </div>
    </motion.div>
  );
}
