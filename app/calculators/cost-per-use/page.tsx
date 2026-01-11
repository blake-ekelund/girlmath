"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Share2, Tag } from "lucide-react";
import Nav from "../../components/Nav";
import CalculatorFooter from "../../components/CalculatorFooter";

/* ---------------------------------------------
   Helpers
--------------------------------------------- */
function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCurrencyNoCents(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export default function CostPerUseCalculator() {
  // Price
  const [priceRaw, setPriceRaw] = useState<number | null>(null);
  const [priceDisplay, setPriceDisplay] = useState("");

  // Uses
  const [usesRaw, setUsesRaw] = useState<number | null>(null);
  const [usesDisplay, setUsesDisplay] = useState("");

  // Sale
  const [onSale, setOnSale] = useState<boolean | null>(null);

  // Savings
  const [savingsRaw, setSavingsRaw] = useState<number | null>(null);
  const [savingsDisplay, setSavingsDisplay] = useState("");

  const [submitted, setSubmitted] = useState(false);

  // Base math
  const baseCost =
    submitted && priceRaw && usesRaw && usesRaw > 0
      ? priceRaw / usesRaw
      : null;

  // Girl math compounding
  let girlMathCost = baseCost;

  if (girlMathCost && onSale) girlMathCost *= 0.85;
  if (girlMathCost && savingsRaw && savingsRaw > 0) girlMathCost *= 0.9;

  function shareMath() {
    const url = window.location.href;
    const text =
      onSale && savingsRaw
        ? `I did the girl math and saved ${formatCurrencyNoCents(savingsRaw)}.`
        : "I did the girl math and it checks out.";

    if (navigator.share) {
      navigator.share({ title: "Girl Math", text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
    }
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
            <Calculator className="h-5 w-5 text-[#9929EA]" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              cost per use
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            Let’s break it down
          </h1>

          <p className="text-zinc-600 text-lg">
            Divide the price until it becomes responsible.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How much does it cost?
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

          {/* Uses */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How many times will you use it?
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Be optimistic"
              value={usesDisplay}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (!raw) {
                  setUsesRaw(null);
                  setUsesDisplay("");
                  return;
                }
                const num = Number(raw);
                setUsesRaw(num);
                setUsesDisplay(formatNumber(num));
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

          {/* On sale */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Tag className="h-4 w-4 text-[#9929EA]" />
              Was it on sale?
            </label>
            <div className="flex gap-3">
              {["Yes", "No"].map((option) => {
                const value = option === "Yes";
                const active = onSale === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setOnSale(value)}
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

          {/* Savings */}
          <AnimatePresence>
            {onSale && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-zinc-700">
                  How much did you save?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="$0"
                  value={savingsDisplay}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    if (!raw) {
                      setSavingsRaw(null);
                      setSavingsDisplay("");
                      return;
                    }
                    const num = Number(raw);
                    setSavingsRaw(num);
                    setSavingsDisplay(formatCurrencyNoCents(num));
                  }}
                  className="
                    w-full rounded-xl
                    border border-black/20
                    px-4 py-3 text-lg
                    focus:outline-none
                    focus:ring-2 focus:ring-[#FF5FCF]
                  "
                />
              </motion.div>
            )}
          </AnimatePresence>

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
          {girlMathCost !== null && (
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
              {savingsRaw && (
                <div className="text-sm text-black/60">
                  You saved {formatCurrencyNoCents(savingsRaw)}.
                </div>
              )}

              <div className="text-4xl font-semibold text-[#FF5FCF]">
                {formatCurrency(girlMathCost)}
              </div>

              <p className="text-black/70 text-lg">per use.</p>

              <p className="font-medium text-[#000000]">
                {savingsRaw
                  ? "You didn’t spend money. You made a decision."
                  : "That’s basically nothing."}
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

        <CalculatorFooter current="/calculators/cost-per-use" />
      </main>
    </div>
  );
}
