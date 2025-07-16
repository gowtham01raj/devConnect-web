import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const Array=state.filter((r)=>r._id!==action.payload);
      return Array;
    },
  },
});
export const { addFeed,removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
