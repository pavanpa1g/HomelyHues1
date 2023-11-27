import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    street: "",
    city: "",
    district: "",
    state: "",
    postalCode: "",
    coords: {
      latitude: "",
      longitude: "",
    },
  },
  contactNumber: "",
  foodMenu: "",
  hostelName: "",
  image: "",
  numberOfRooms: "",
  roomTypes: [],
  owner: "",
};

const selectedHostelSlice = createSlice({
  name: "selectedHostelSlice",
  initialState,
  reducers: {
    setSelectedHostel: (state, { payload }) => {
      return { ...state, ...payload };
    },
  },
});

export const { setSelectedHostel } = selectedHostelSlice.actions;

export default selectedHostelSlice.reducer;
