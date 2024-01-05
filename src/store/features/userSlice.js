"use slice";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import apiStatusConstants from "@/utils/apiconstants";
const initialState = {
  user: {},
  apiStatus: apiStatusConstants.initial,
  errorMessage: "",
};

export const userRegisterThunk = createAsyncThunk(
  "userRegisterThunk",
  async (requestedData) => {
    const config = {
      method: "POST",
      body: JSON.stringify(requestedData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("requested", requestedData, config);
    const response = await fetch("/api/register", config);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterThunk.pending, (state) => {
        state.apiStatus = apiStatusConstants.progress;
      })
      .addCase(userRegisterThunk.fulfilled, (state, action) => {
        console.log("action success", action);
        state.user = action.payload;
        state.apiStatus = apiStatusConstants.success;
      })
      .addCase(userRegisterThunk.rejected, (state, action) => {
        console.log("actions", action);
        state.apiStatus = apiStatusConstants.failure;
        state.errorMessage = action.error.message || "Something went wrong";
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
