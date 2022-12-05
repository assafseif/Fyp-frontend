import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { removeToken } from "../../lib/token";

const signout = (context) => {
  const router = useRouter();
  removeToken();

  useEffect(() => {
    router.push("/");
  });
};

export default signout;
