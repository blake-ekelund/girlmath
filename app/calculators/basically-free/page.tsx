"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Share2, Gift } from "lucide-react";
import Nav from "../../components/Nav";
import CalculatorFooter from "../../components/CalculatorFooter";

/* ---------------------------------------------
   Helpers
--------------------------------------------- */
function formatCurrencyNoCents(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function BasicallyFreeCalculator() {
  // Price
  const [priceRaw, setPriceRaw] = useState<number | null>(null);
  const [priceDisplay, setPriceDisplay] = useState("");

  // Gift card / credit
  const [giftCard, setGiftCard] = useState<boolean | null>(null);

  // Mentally spent
  const [mentallySpent, setMentallySpent] = useState<boolean | null>(null);

  const [submitted, setSubmitted] = useState(false);

  function shareMath(verdict: string) {
    const url = window.location.href;
    const text = `I did the girl math and it was ${verdict.toLowerCase()}.`;

    if (navigator.share) {
      navigator
        .share({
          title: "Girl Math – Basically Free",
          text,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  // Verdict logic
  let verdict: "Literally free" | "Basically free" | null = null;

  if (submitted && priceRaw !== null) {
    if (giftCard && mentallySpent) verdict = "Literally free";
    else verdict = "Basically free";
  }

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
          <div className="flex items-center justify-center gap-2 text-[#000000]">
            <Sparkles className="h-5 w-5 text-[#9929EA]" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              basically free
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            Let’s be honest
          </h1>

          <p className="text-zinc-600 text-lg">
            Some money doesn’t count.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How much did it cost?
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$0"
              value={priceDisplay}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (!raw) {
                  setPriceRaw(null);
                  setPriceDisplay("");
                  return;
                }
                const num = Number(raw);
                setPriceRaw(num);
                setPriceDisplay(formatCurrencyNoCents(num));
              }}
              className="
                w-full rounded-xl
                border border-black/20
                px-4 py-3 text-lg
                focus:outline-none
                focus:ring-2 focus:ring-[#FF5FCF]
              "
            />
          </div>

          {/* Gift card */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Gift className="h-4 w-4 text-[#9929EA]" />
              Did you use a gift card or store credit?
            </label>
            <div className="flex gap-3">
              {["Yes", "No"].map((opt) => {
                const value = opt === "Yes";
                const active = giftCard === value;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGiftCard(value)}
                    className={`
                      flex-1 rounded-full border px-4 py-3 text-sm font-medium transition
                      ${
                        active
                          ? "bg-[#FF5FCF] text-white border-[#FF5FCF]"
                          : "bg-white text-[#000000] border-black/20 hover:border-black/40"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mentally spent */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              Had you already mentally spent this money?
            </label>
            <div className="flex gap-3">
              {["Yes", "Obviously"].map((opt) => {
                const value = opt === "Obviously";
                const active = mentallySpent === value;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setMentallySpent(value)}
                    className={`
                      flex-1 rounded-full border px-4 py-3 text-sm font-medium transition
                      ${
                        active
                          ? "bg-[#FF5FCF] text-white border-[#FF5FCF]"
                          : "bg-white text-[#000000] border-black/20 hover:border-black/40"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setSubmitted(true)}
            className="
              w-full rounded-full
              bg-[#000000] text-white
              py-4 text-lg font-medium
              hover:opacity-90 transition
            "
          >
            Do the math
          </motion.button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {verdict && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="
                rounded-2xl
                bg-[#FAEB92]
                border border-black/20
                p-6 space-y-4 text-center
              "
            >
              <div className="text-sm text-black/60">
                You “spent” {formatCurrencyNoCents(priceRaw!)}.
              </div>

              <div className="text-3xl font-semibold text-[#FF5FCF]">
                {verdict}.
              </div>

              <p className="font-medium text-[#000000]">
                No further discussion is needed.
              </p>

              <button
                onClick={() => shareMath(verdict)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black transition"
              >
                <Share2 className="h-4 w-4" />
                Share the math
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <CalculatorFooter current="/calculators/basically-free" />
      </main>
    </div>
  );
}
