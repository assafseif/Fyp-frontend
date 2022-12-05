import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import postsSlice from "./postsSlice";
import FavoriteSlice from "./FavoriteSlice";
export const store = configureStore({
  reducer: {
    mypost: postSlice,
    posts: postsSlice,
    Favorite: FavoriteSlice,
  },
});
