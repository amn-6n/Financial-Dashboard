"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  categoryFilter: "all",
  typeFilter: "all",
  sortBy: "date",
  sortOrder: "desc",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.categoryFilter = "all";
      state.typeFilter = "all";
      state.sortBy = "date";
      state.sortOrder = "desc";
    },
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setTypeFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
