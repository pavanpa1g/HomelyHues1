import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const selectedHostelSlice = createSlice({
  name: "selectedHostelSlice",
  initialState,
  reducers: {
    setSelectedHostel: (state, { payload }) => {
      console.log("payload", payload);
      return { ...state, ...payload };
    },
  },
});

export const { setSelectedHostel } = selectedHostelSlice.actions;

export default selectedHostelSlice.reducer;
