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
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import { formatDateShort } from "@/utils/format";

export function BalanceChart({ transactions }) {
  const chartData = React.useMemo(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    let runningBalance = 0;
    const balanceByDate = {};

    sortedTransactions.forEach((transaction) => {
      const amount =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;

      runningBalance += amount;
      balanceByDate[transaction.date] = runningBalance;
    });

    return Object.entries(balanceByDate).map(([date, balance]) => ({
      date: formatDateShort(date),
      balance: Number(balance.toFixed(2)),
    }));
  }, [transactions]);

  const chartConfig = {
    balance: {
      label: "Balance",
      color: "var(--chart-1)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
        <CardDescription>Your account balance over time</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData} accessibilityLayer>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value}`}
            />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="var(--color-balance)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
