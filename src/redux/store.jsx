"use client";

import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactionsSlice";
import filtersReducer from "./filtersSlice";
import userRoleReducer from "./userRoleSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    filters: filtersReducer,
    userRole: userRoleReducer,
  },
});
