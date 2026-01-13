"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Share2 } from "lucide-react";
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

function verdictForValue(per: number) {
  if (per < 5) return "Basically free";
  if (per < 10) return "Totally reasonable";
  return "Still defensible";
}

export default function CostAndComplimentsCalculator() {
  const [costRaw, setCostRaw] = useState<number | null>(null);
  const [costDisplay, setCostDisplay] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const COMPLIMENT_COUNTS = [5, 10, 25, 50, 100];
  const BASICALLY_FREE_THRESHOLD = 5;

  const rows =
    submitted && costRaw
      ? COMPLIMENT_COUNTS.map((totalCompliments) => {
          const per = costRaw / totalCompliments;
          return {
            compliments: totalCompliments,
            costPerCompliment: per,
            verdict: verdictForValue(per),
            isFree: per < BASICALLY_FREE_THRESHOLD,
          };
        })
      : null;

  const firstFreeRow = rows?.find((r) => r.isFree) ?? null;

  function shareMath() {
    const url = window.location.href;
    const text = firstFreeRow
      ? `Basically free after ${firstFreeRow.compliments} compliments.`
      : "I did the cost & compliments math.";

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
            <Sparkles className="h-5 w-5 text-[#9929EA]" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              cost & compliments
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#000000]">
            Compliments are currency.
          </h1>

          <p className="text-zinc-600 text-lg">
            Let’s price them honestly.
          </p>
        </motion.div>

        {/* Input */}
        <div className="space-y-6">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Item cost ($)"
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
              focus:ring-2 focus:ring-[#FF5FCF]
            "
          />

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

        {/* Result Table */}
        <AnimatePresence>
          {rows && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="
                rounded-2xl
                bg-[#FAEB92]
                border border-black/20
                p-6 space-y-4
              "
            >
              {firstFreeRow && (
                <p className="text-sm text-black/70 text-center">
                  Basically free after{" "}
                  <span className="font-semibold text-[#FF5FCF]">
                    {firstFreeRow.compliments} compliments
                  </span>.
                </p>
              )}

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-black/60 text-left">
                    <th className="py-2">Compliments</th>
                    <th className="py-2">$/compliment</th>
                    <th className="py-2">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr
                      key={row.compliments}
                      className={`border-t border-black/10 ${
                        row.isFree
                          ? "text-[#FF5FCF] font-semibold"
                          : "text-black"
                      }`}
                    >
                      <td className="py-2">
                        {row.compliments}
                      </td>
                      <td className="py-2">
                        {formatCurrency(row.costPerCompliment)}
                      </td>
                      <td className="py-2">
                        {row.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={shareMath}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-black/70 hover:text-black transition"
              >
                <Share2 className="h-4 w-4" />
                Share the math
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <CalculatorFooter current="/calculators/cost-and-compliments" />
      </main>
    </div>
  );
}
