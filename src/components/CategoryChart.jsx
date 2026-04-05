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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

import { getCategoryColor } from "@/utils/categories";

export function CategoryChart({ transactions }) {
  const chartData = React.useMemo(() => {
    const expensesByCategory = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((transaction) => {
        expensesByCategory[transaction.category] =
          (expensesByCategory[transaction.category] || 0) + transaction.amount;
      });

    return Object.entries(expensesByCategory)
      .map(([category, amount]) => ({
        category,
        amount: Number(amount.toFixed(2)),
        fill: getCategoryColor(category),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8);
  }, [transactions]);

  const chartConfig = chartData.reduce(
    (config, item) => ({
      ...config,
      [item.category]: {
        label: item.category,
        color: item.fill,
      },
    }),
    {},
  );

  const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Top categories by expense amount</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart accessibilityLayer>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" />}
            />

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={false}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>

            <ChartLegend
              content={
                <ChartLegendContent className="flex-wrap px-2 text-foreground" />
              }
            />
          </PieChart>
        </ChartContainer>

        <div className="mt-4 text-center text-sm text-foreground">
          Total Expenses:{" "}
          <span className="font-semibold text-foreground">
            ${totalExpenses.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
