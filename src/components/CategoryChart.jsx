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
import { useTheme } from "@/components/theme-provider";

import { getCategoryColor } from "@/utils/categories";

export function CategoryChart({ transactions }) {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = React.useState("light");

  React.useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applySystemTheme = () => {
      setResolvedTheme(mediaQuery.matches ? "dark" : "light");
    };

    applySystemTheme();
    mediaQuery.addEventListener("change", applySystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", applySystemTheme);
    };
  }, [theme]);

  const pieFillColor = resolvedTheme === "dark" ? "#ffffff" : "#111111";

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
        <CardTitle className="text-lg sm:text-xl">
          Spending by Category
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Top categories by expense amount
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        phonne{" "}
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[260px] w-full sm:h-[300px] md:h-[340px]"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="category" />}
            />

            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="48%"
              outerRadius={80}
              label={false}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieFillColor} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-3 px-2">
          {chartData.map((item) => (
            <div
              key={item.category}
              className="flex items-center gap-2 text-xs sm:text-sm"
            >
              <span
                className="inline-block size-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-foreground">{item.category}</span>
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-foreground">
          Total Expenses:{" "}
          <span className="font-semibold text-foreground">
            ${totalExpenses.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
