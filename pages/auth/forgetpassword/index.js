import React from "react";
import { DivContainer } from "./styles";
import { useState } from "react";
import { postData } from "../../../components/api/ApiMethods";
import getConfig from "next/config";
import Head from "next/head";
import { setCookie } from "nookies";
const { publicRuntimeConfig } = getConfig();

import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { textAlign } from "@mui/system";
const FormPost = (props) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    messageError: "",
    emailError: "",
  });
  async function submit(e) {
    setErrors(() => {
      return {
        messageError: "",
        emailError: "",
      };
    });
    e.preventDefault();
    const awaited = await postData(
      `${publicRuntimeConfig.API_URL}/auth/reset/password`,
      formData
    );

    {
      awaited.error &&
        setErrors((prev) => {
          return { ...prev, emailError: awaited.error.message };
        });
    }
    {
      awaited.messageError &&
        setErrors((prev) => {
          return { ...prev, messageError: awaited.messageError };
        });
    }
    {
      !awaited.error && !awaited.messageError && router.push("/");
    }
  }
  function Change(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <>
      <Head>
        <title>Reset Yout Password</title>
      </Head>
      <DivContainer>
        <form onSubmit={submit}>
          {errors.messageError && <p>{errors.messageError}</p>}
          {errors.emailError && <p>{errors.emailError}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={Change}
          />

          <Button variant="outlined" size="medium" type="submit">
            Reset
          </Button>
        </form>
      </DivContainer>
      <div style={{ textAlign: "center" }}></div>
    </>
  );
};

export default FormPost;
