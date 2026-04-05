"use client";

import React from "react";
import { TransactionTable } from "@/components/TransactionTable";
import { TransactionModal } from "@/components/TransactionModal";
import { Filters } from "@/components/Filters";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateTransaction,
  deleteTransaction,
  addTransaction,
} from "@/redux/transactionsSlice";

import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function Transactions() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  );
  const filters = useAppSelector((state) => state.filters);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState("add");
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.description?.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query),
      );
    }

    if (filters.typeFilter !== "all") {
      result = result.filter((t) => t.type === filters.typeFilter);
    }

    if (filters.categoryFilter !== "all") {
      result = result.filter((t) => t.category === filters.categoryFilter);
    }

    result.sort((a, b) => {
      const aValue =
        filters.sortBy === "date" ? new Date(a.date).getTime() : a.amount;

      const bValue =
        filters.sortBy === "date" ? new Date(b.date).getTime() : b.amount;

      return filters.sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    return result;
  }, [transactions, filters]);

  const handleAdd = () => {
    setModalMode("add");
    setSelectedTransaction(null);
    setModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setModalMode("edit");
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      dispatch(deleteTransaction(id));
      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.error(error);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (modalMode === "add") {
        const { data: newTransaction, error } = await supabase
          .from("transactions")
          .insert([data])
          .select()
          .single();

        if (error) throw error;

        dispatch(addTransaction(newTransaction));
        toast.success("Transaction added successfully");
      } else if (selectedTransaction) {
        const { data: updatedTransaction, error } = await supabase
          .from("transactions")
          .update(data)
          .eq("id", selectedTransaction.id)
          .select()
          .single();

        if (error) throw error;

        dispatch(updateTransaction(updatedTransaction));
        toast.success("Transaction updated successfully");
      }
    } catch (error) {
      toast.error(`Failed to ${modalMode} transaction`);
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">
          View and manage your financial transactions
        </p>
      </div>

      <Filters />

      <TransactionTable
        transactions={filteredTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      <TransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        transaction={selectedTransaction}
        mode={modalMode}
      />
    </div>
  );
}
