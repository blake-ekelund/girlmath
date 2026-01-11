"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Sparkles } from "lucide-react";
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

export default function SelfCareMathCalculator() {
  // Cost
  const [costRaw, setCostRaw] = useState<number | null>(null);
  const [costDisplay, setCostDisplay] = useState("");

  // Stress level
  const [stress, setStress] = useState<"low" | "medium" | "high" | null>(null);

  // Helps mental health
  const [helps, setHelps] = useState<boolean | null>(null);

  const [submitted, setSubmitted] = useState(false);

  function shareMath() {
    const url = window.location.href;
    const text = "I did the self-care math and it was necessary.";

    if (navigator.share) {
      navigator
        .share({
          title: "Girl Math – Self-Care Math",
          text,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  const verdict =
    submitted && costRaw
      ? stress === "high"
        ? "This is not a purchase. This is maintenance."
        : helps
        ? "Mental health is not optional."
        : "You deserve nice things."
      : null;

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
            <Heart className="h-5 w-5 text-[#9929EA]" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              self-care math
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            This isn’t extra.
            <br />
            This is required.
          </h1>

          <p className="text-zinc-600 text-lg">
            Emotional upkeep has no budget cap.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Cost */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How much does it cost?
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="$0"
              value={costDisplay}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (!raw) {
                  setCostRaw(null);
                  setCostDisplay("");
                  return;
                }
                const num = Number(raw);
                setCostRaw(num);
                setCostDisplay(formatCurrencyNoCents(num));
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

          {/* Stress */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How stressed are you?
            </label>
            <div className="flex gap-3">
              {[
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ].map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setStress(s.value as any)}
                  className={`
                    flex-1 rounded-full border px-4 py-3 text-sm font-medium transition
                    ${
                      stress === s.value
                        ? "bg-[#FF5FCF] text-white border-[#FF5FCF]"
                        : "bg-white text-[#000000] border-black/20 hover:border-black/40"
                    }
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Helps mental health */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-[#9929EA]" />
              Does this help your mental health?
            </label>
            <div className="flex gap-3">
              {["Yes", "Obviously"].map((option) => {
                const value = option === "Obviously";
                const active = helps === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setHelps(value)}
                    className={`
                      flex-1 rounded-full border px-4 py-3 text-sm font-medium transition
                      ${
                        active
                          ? "bg-[#FF5FCF] text-white border-[#FF5FCF]"
                          : "bg-white text-[#000000] border-black/20 hover:border-black/40"
                      }
                    `}
                  >
                    {option}
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
            Do the self-care math
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
                You spent {formatCurrencyNoCents(costRaw!)}.
              </div>

              <p className="text-xl font-semibold text-[#FF5FCF]">
                {verdict}
              </p>

              <button
                onClick={shareMath}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black transition"
              >
                <Share2 className="h-4 w-4" />
                Share the math
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <CalculatorFooter current="/calculators/self-care" />
      </main>
    </div>
  );
}
