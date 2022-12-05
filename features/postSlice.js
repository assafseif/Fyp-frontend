import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { DeletePost } from "../components/api/ApiMethods";
import { parseCookies } from "nookies";
const url = `${publicRuntimeConfig.API_URL}/get-posts`;

const initialState = {
  myposts: [],
  isLoading: true,
};
export const myPosts = createAsyncThunk("myPosts/myPosts", (context) => {
  const jwt = parseCookies(context).jwt || null;
  return fetch(`${process.env.API_URL}/my-posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    deletePosts: (state, action) => {
      const data = DeletePost(
        `${process.env.API_URL}/delete-post/${action.payload}`
      );
    },
  },

  extraReducers: {
    [myPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [myPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myposts = action.payload.Posts;
    },
    [myPosts.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { deletePosts } = postSlice.actions;

export default postSlice.reducer;
