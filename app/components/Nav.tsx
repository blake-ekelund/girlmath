"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Calculator, Share2 } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  function shareMath() {
    const url = window.location.href;
    const text = "Check your math. Respectfully.";

    if (navigator.share) {
      navigator
        .share({
          title: "Girl Math",
          text,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }

    setOpen(false);
  }

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-4 right-4 z-50
          rounded-full bg-white
          p-3 shadow-md
          hover:bg-[#FAEB92]
          transition
        "
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-[#000000]" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="
                absolute top-4 right-4
                rounded-full p-3
                hover:bg-[#FAEB92]
                transition
              "
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-[#000000]" />
            </button>

            {/* Menu items */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-10 text-center"
            >
              <Link
                href="/calculators"
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-3
                  text-3xl font-semibold
                  text-[#000000]
                  hover:text-[#FF5FCF]
                  transition
                "
              >
                <Calculator className="h-7 w-7 text-[#9929EA]" />
                Calculators
              </Link>

              <Link
                href="/what-is-girl-math"
                onClick={() => setOpen(false)}
                className="
                  flex items-center gap-3
                  text-3xl font-semibold
                  text-[#000000]
                  hover:text-[#FF5FCF]
                  transition
                "
              >
                <Sparkles className="h-7 w-7 text-[#9929EA]" />
                What Is Girl Math?
              </Link>

              {/* Share */}
              <button
                onClick={shareMath}
                className="
                  flex items-center gap-3
                  text-3xl font-semibold
                  text-[#000000]
                  hover:text-[#FF5FCF]
                  transition
                "
              >
                <Share2 className="h-7 w-7 text-[#9929EA]" />
                Share the Math
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
