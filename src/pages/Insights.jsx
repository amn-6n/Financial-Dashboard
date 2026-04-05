"use client";

import { InsightsPanel } from "@/components/InsightsPanel";
import { useAppSelector } from "@/redux/hooks";

export function Insights() {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
        <p className="text-muted-foreground">
          Discover patterns and trends in your spending
        </p>
      </div>

      <InsightsPanel transactions={transactions} />
    </div>
  );
}
