"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
      state.error = null;
    },

    addTransaction: (state, action) => {
      state.transactions.unshift(action.payload);
    },

    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id,
      );

      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload,
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
