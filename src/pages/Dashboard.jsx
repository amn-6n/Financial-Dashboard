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
    <div className="space-y-4 sm:space-y-6">
      <div className="px-2 sm:px-0">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          Dashboard
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <BalanceChart transactions={transactions} />
        <CategoryChart transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;
