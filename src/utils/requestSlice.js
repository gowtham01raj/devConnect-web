import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const Array = state.filter((r) => r._id !== action.payload);
      return Array;
    },
  },
});

export default requestSlice.reducer;
export const { addRequests, removeRequests } = requestSlice.actions;
