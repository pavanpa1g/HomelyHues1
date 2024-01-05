import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist(state, action) {
      const isAlreadyIncluded = state.some(
        (item) => item._id == action.payload._id
      );

      if (!isAlreadyIncluded) {
        state.push(action.payload);
      } else {
        return state.filter((item) => item._id != action.payload._id);
      }
    },
  },
});

export const { addToWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
