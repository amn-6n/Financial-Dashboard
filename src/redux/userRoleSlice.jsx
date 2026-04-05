"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "admin",
};

const userRoleSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },

    toggleRole: (state) => {
      state.role = state.role === "admin" ? "viewer" : "admin";
    },
  },
});

export const { setUserRole, toggleRole } = userRoleSlice.actions;

export default userRoleSlice.reducer;
