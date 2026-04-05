"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Pencil as PencilIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
} from "lucide-react";

import { formatCurrency, formatDate } from "@/utils/format";
import { useAppSelector } from "@/redux/hooks";

export function TransactionTable({ transactions, onEdit, onDelete, onAdd }) {
  const userRole = useAppSelector((state) => state.userRole.role);
  const isAdmin = userRole === "admin";

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-0">
        <CardTitle className="text-lg sm:text-xl">
          Recent Transactions
        </CardTitle>

        {isAdmin && (
          <Button onClick={onAdd} size="sm" className="w-full sm:w-auto">
            <PlusIcon className="size-4" />
            Add Transaction
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table className="text-sm sm:text-base">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                {isAdmin && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 6 : 5}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {formatDate(transaction.date)}
                    </TableCell>

                    <TableCell className="max-w-[200px] truncate">
                      {transaction.description || "-"}
                    </TableCell>

                    <TableCell>{transaction.category}</TableCell>

                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "income"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          transaction.type === "income"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>

                    {isAdmin && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onEdit(transaction)}
                          >
                            <PencilIcon />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onDelete(transaction.id)}
                          >
                            <Trash2Icon />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
