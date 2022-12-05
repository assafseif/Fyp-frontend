import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import MyCards from "../../components/sections/MyCard/MyCards";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { getData } from "../../components/api/ApiMethods";
import { useSelector, useDispatch } from "react-redux";
import { DeletePost } from "../../components/api/ApiMethods";
import { myPosts } from "../../features/postSlice";
import { deletePosts } from "../../features/postSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Head from "next/head";

import styled from "styled-components";
const Divcontainer = styled.h1`
  text-align: center;
`;

const myposts = () => {
  const posts = useSelector((state) => state.mypost.myposts);
  const isLoading = useSelector((state) => state.mypost.isLoading);
  const dispatch = useDispatch();

  const deletePost = (id) => {
    dispatch(deletePosts(id));
    dispatch(myPosts());
    dispatch(myPosts());
  };

  useEffect(() => {
    dispatch(myPosts());
  }, []);

  if (isLoading) {
    return (
      <Divcontainer>
        <CircularProgress />
      </Divcontainer>
    );
  }

  if (!posts) {
    return <div style={{ textAlign: "center" }}>No Posts to fetch</div>;
  }

  return (
    <div style={{ display: "flex", padding: "25px" }}>
      <Head>
        <title>My posts</title>
      </Head>
      {posts.map((post, index) => {
        return <MyCards post={post} key={index} deletePost={deletePost} />;
      })}
    </div>
  );
};

export default myposts;
