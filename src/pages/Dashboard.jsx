"use client";

import React from "react";
import { SummaryCard } from "@/components/SummaryCard";
import { BalanceChart } from "@/components/BalanceChart";
import { CategoryChart } from "@/components/CategoryChart";
import { useAppSelector } from "@/redux/hooks";

export function Dashboard() {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  );

  const summary = React.useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Balance"
          amount={summary.balance}
          type="balance"
        />
        <SummaryCard
          title="Total Income"
          amount={summary.income}
          type="income"
        />
        <SummaryCard
          title="Total Expenses"
          amount={summary.expenses}
          type="expense"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BalanceChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>
    </div>
  );
}
