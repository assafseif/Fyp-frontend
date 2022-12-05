import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { DeletePost } from "../components/api/ApiMethods";
import { parseCookies } from "nookies";
const url = `${publicRuntimeConfig.API_URL}/get-posts`;

const initialState = {
  posts: [],
  isLoading: true,
  page: 1,
};

export const getPosts = createAsyncThunk("posts/getPosts", (page) => {
  return fetch(`${process.env.API_URL}/get-posts?page=1`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    NextPage: (state) => {
      state.page = state.page + 1;
    },
  },

  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { NextPage } = postSlice.actions;

export default postSlice.reducer;
