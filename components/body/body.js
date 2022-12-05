import React from "react";
import Swip from "../sections/swiper/swiper.js";
import { postData } from "../api/ApiMethods.js";
import getConfig from "next/config";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const { publicRuntimeConfig } = getConfig();
import styled from "styled-components";
import { isAdmin } from "../../lib/token.js";

import { useRouter } from "next/Router";

const CircleContainer = styled(AddCircleOutlineOutlinedIcon)`
  //color: #caafa8;
  color: black;
  position: fixed;
  font-size: 50px;
  right: 15px;
  bottom: 15px;
  z-index: 1;
`;
const body = () => {
  const router = useRouter();
  function AddPost() {
    router.push("/post/add-post");
  }
  return (
    <>
      {isAdmin() && <CircleContainer onClick={AddPost} />}
      <Swip />
    </>
  );
};

export default body;
