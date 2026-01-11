"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Share2, Sparkles } from "lucide-react";
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

export default function TravelMathCalculator() {
  // Cost
  const [costRaw, setCostRaw] = useState<number | null>(null);
  const [costDisplay, setCostDisplay] = useState("");

  // Days
  const [daysRaw, setDaysRaw] = useState<number | null>(null);
  const [daysDisplay, setDaysDisplay] = useState("");

  // Special trip
  const [special, setSpecial] = useState<boolean | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const baseCostPerDay =
    submitted && costRaw && daysRaw && daysRaw > 0
      ? costRaw / daysRaw
      : null;

  // Girl math adjustment
  const girlMathCostPerDay =
    baseCostPerDay && special ? baseCostPerDay * 0.8 : baseCostPerDay;

  function shareMath() {
    const url = window.location.href;
    const text = special
      ? "I did the travel math and it was a special trip."
      : "I did the travel math and it made sense.";

    if (navigator.share) {
      navigator
        .share({
          title: "Girl Math – Travel Math",
          text,
          url,
        })
        .catch(() => {});
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
            <Plane className="h-5 w-5 text-[#9929EA]" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              travel math
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            It’s not a trip.
            <br />
            It’s an experience.
          </h1>

          <p className="text-zinc-600 text-lg">
            Memories age better than money.
          </p>
        </motion.div>

        {/* Inputs */}
        <div className="space-y-6">
          {/* Trip cost */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How much was the trip?
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

          {/* Days */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">
              How many days?
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Including travel days"
              value={daysDisplay}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (!raw) {
                  setDaysRaw(null);
                  setDaysDisplay("");
                  return;
                }
                const num = Number(raw);
                setDaysRaw(num);
                setDaysDisplay(num.toLocaleString("en-US"));
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

          {/* Special trip */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-[#9929EA]" />
              Was this a special trip?
            </label>
            <div className="flex gap-3">
              {["Yes", "No"].map((option) => {
                const value = option === "Yes";
                const active = special === value;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSpecial(value)}
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
            Do the travel math
          </motion.button>
        </div>

        {/* Result */}
        <AnimatePresence>
          {girlMathCostPerDay !== null && (
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
              <div className="text-4xl font-semibold text-[#FF5FCF]">
                {formatCurrency(girlMathCostPerDay)}
              </div>

              <p className="text-black/70 text-lg">per day.</p>

              <p className="font-medium text-[#000000]">
                {special
                  ? "You’re not spending money. You’re collecting memories."
                  : "That’s a small price for a good story."}
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
        <CalculatorFooter current="/calculators/travel-math" />
      </main>
    </div>
  );
}
