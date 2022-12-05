import React from "react";
import FormPost from "../../components/sections/FormPost/FormPost";
import Head from "next/head";
import { useEffect } from "react";

import { parseCookies } from "nookies";
import Router from "next/router";
const addpost = (context) => {
  const jwt = parseCookies(context).jwt || null;

  useEffect(() => {
    if (!jwt) {
      Router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Adding post</title>
      </Head>
      <FormPost />
    </>
  );
};

export default addpost;
