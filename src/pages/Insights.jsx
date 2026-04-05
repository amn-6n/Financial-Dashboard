"use client";

import { InsightsPanel } from "@/components/InsightsPanel";
import { useAppSelector } from "@/redux/hooks";

export function Insights() {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="px-2 sm:px-0">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Insights
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Discover patterns and trends in your spending
        </p>
      </div>

      <InsightsPanel transactions={transactions} />
    </div>
  );
}

export default Insights;
