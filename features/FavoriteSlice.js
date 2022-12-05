import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { Deletefavorite } from "../components/api/ApiMethods";
import { parseCookies } from "nookies";
const url = `${publicRuntimeConfig.API_URL}/my-favorites`;

const initialState = {
  favorites: {},
  isLoading: false,
};

export const getfavorites = createAsyncThunk("favorites/getfavorites", (context) => {
  const jwt = parseCookies(context).jwt || null;
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .catch((err) =>    next(err));
});

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},

  extraReducers: {
    [getfavorites.pending]: (state) => {
      state.isLoading = true;
    },
    [getfavorites.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorites = action?.payload?.favorites;
    },
    [getfavorites.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { check, isFalse } = favoriteSlice.actions;

export default favoriteSlice.reducer;
