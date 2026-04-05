"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CircleAlert as AlertCircleIcon,
  CircleCheck as CheckCircle2Icon,
} from "lucide-react";

import { formatCurrency } from "@/utils/format";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function InsightsPanel({ transactions }) {
  const insights = React.useMemo(() => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth - 1;

    const currentMonthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === currentMonth,
    );

    const lastMonthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === lastMonth,
    );

    const expensesByCategory = {};

    currentMonthTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        expensesByCategory[t.category] =
          (expensesByCategory[t.category] || 0) + t.amount;
      });

    const highestCategory = Object.entries(expensesByCategory).sort(
      ([, a], [, b]) => b - a,
    )[0];

    const currentIncome = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentExpenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const lastIncome = lastMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const lastExpenses = lastMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const incomeChange = lastIncome
      ? ((currentIncome - lastIncome) / lastIncome) * 100
      : 0;

    const expenseChange = lastExpenses
      ? ((currentExpenses - lastExpenses) / lastExpenses) * 100
      : 0;

    const savingsRate = currentIncome
      ? ((currentIncome - currentExpenses) / currentIncome) * 100
      : 0;

    return {
      highestCategory: highestCategory
        ? {
            name: highestCategory[0],
            amount: highestCategory[1],
          }
        : null,
      incomeChange,
      expenseChange,
      savingsRate,
      currentIncome,
      currentExpenses,
    };
  }, [transactions]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
          <CardDescription>
            Key observations about your finances
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {insights.highestCategory && (
            <Alert>
              <TrendingDownIcon className="size-4" />
              <AlertTitle>Top Spending Category</AlertTitle>
              <AlertDescription>
                Your highest expense category this month is{" "}
                <strong>{insights.highestCategory.name}</strong> with{" "}
                {formatCurrency(insights.highestCategory.amount)} spent.
              </AlertDescription>
            </Alert>
          )}

          <Alert>
            <TrendingUpIcon className="size-4" />
            <AlertTitle>Income Comparison</AlertTitle>
            <AlertDescription>
              Your income this month is{" "}
              <strong
                className={
                  insights.incomeChange >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {insights.incomeChange >= 0 ? "+" : ""}
                {insights.incomeChange.toFixed(1)}%
              </strong>{" "}
              compared to last month ({formatCurrency(insights.currentIncome)}).
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertCircleIcon className="size-4" />
            <AlertTitle>Expense Comparison</AlertTitle>
            <AlertDescription>
              Your expenses this month are{" "}
              <strong
                className={
                  insights.expenseChange <= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {insights.expenseChange >= 0 ? "+" : ""}
                {insights.expenseChange.toFixed(1)}%
              </strong>{" "}
              compared to last month ({formatCurrency(insights.currentExpenses)}
              ).
            </AlertDescription>
          </Alert>

          <Alert>
            <CheckCircle2Icon className="size-4" />
            <AlertTitle>Savings Rate</AlertTitle>
            <AlertDescription>
              You are saving{" "}
              <strong
                className={
                  insights.savingsRate >= 20
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }
              >
                {insights.savingsRate.toFixed(1)}%
              </strong>{" "}
              of your income this month.{" "}
              {insights.savingsRate >= 20
                ? "Great job!"
                : "Consider increasing your savings."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Total Income
              </span>
              <span className="font-semibold text-green-700 dark:text-green-400">
                {formatCurrency(insights.currentIncome)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Total Expenses
              </span>
              <span className="font-semibold text-red-700 dark:text-red-400">
                {formatCurrency(insights.currentExpenses)}
              </span>
            </div>

            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Net Savings</span>
                <span className="text-lg font-bold">
                  {formatCurrency(
                    insights.currentIncome - insights.currentExpenses,
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
