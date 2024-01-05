"use client";

import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/userSlice";
import selectedHostelSlice from "./features/selectedHostelSlice";
import wishListSlice from "./features/wishListSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    selectedHostel: selectedHostelSlice,
    wishListSlice,
  },
});
