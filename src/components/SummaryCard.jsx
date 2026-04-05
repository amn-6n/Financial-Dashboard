"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";

import { formatCurrency } from "@/utils/format";
import { cn } from "@/lib/utils";

export function SummaryCard({ title, amount, type, trend }) {
  const getIcon = () => {
    switch (type) {
      case "income":
        return (
          <ArrowUpIcon className="size-5 text-green-600 dark:text-green-400" />
        );
      case "expense":
        return (
          <ArrowDownIcon className="size-5 text-red-600 dark:text-red-400" />
        );
      default:
        return (
          <TrendingUpIcon className="size-5 text-blue-600 dark:text-blue-400" />
        );
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case "income":
        return "text-green-700 dark:text-green-400";
      case "expense":
        return "text-red-700 dark:text-red-400";
      default:
        return "text-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>

        <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
          {getIcon()}
        </div>
      </CardHeader>

      <CardContent>
        <div
          className={cn("text-3xl font-bold tracking-tight", getAmountColor())}
        >
          {formatCurrency(amount)}
        </div>

        {trend && (
          <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
            {trend.isPositive ? (
              <ArrowUpIcon className="size-3 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDownIcon className="size-3 text-red-600 dark:text-red-400" />
            )}

            <span
              className={
                trend.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }
            >
              {Math.abs(trend.value)}%
            </span>

            <span>from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
