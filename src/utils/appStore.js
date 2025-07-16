import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import FeedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice"
const appStore = configureStore({
  reducer: {
    user: UserSlice,
    feed: FeedSlice,
    connections: connectionSlice,
    requests:requestSlice
  },
});

export default appStore;
