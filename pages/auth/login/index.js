import React from "react";
import { DivContainer } from "./styles";
import { useState } from "react";
import { postData } from "../../../components/api/ApiMethods";
import getConfig from "next/config";

import { setCookie } from "nookies";
const { publicRuntimeConfig } = getConfig();

import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { textAlign } from "@mui/system";
import Head from "next/head";

const FormPost = (props) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    messageError: "",
    emailError: "",
    passwordError: "",
  });
  async function submit(e) {
    setErrors(() => {
      return {
        messageError: "",
        emailError: "",
        passwordError: "",
      };
    });
    e.preventDefault();
    const awaited = await postData(
      `${publicRuntimeConfig.API_URL}/auth/login`,
      formData
    );
    {
      !awaited.success &&
        awaited.error &&
        awaited.message &&
        setErrors((prev) => {
          return { ...prev, messageError: awaited.error };
        });
    }
    {
      awaited?.error?.length > 0 &&
        awaited?.error?.map((p) => {
          if (p.param === "email") {
            setErrors((prev) => {
              return { ...prev, emailError: p.msg };
            });
          } else if (p.param === "password") {
            setErrors((prev) => {
              return { ...prev, passwordError: p.msg };
            });
          }
        });
    }
    {
      awaited.messageError &&
        setErrors((prev) => {
          return { ...prev, messageError: awaited.messageError };
        });
    }
    if (awaited.jwt) {
      setCookie(null, "jwt", awaited.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
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
      <title>Login</title>
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
          {errors.passwordError && <p>{errors.passwordError}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={Change}
            />

          <Button variant="outlined" size="medium" type="submit">
            Log in
          </Button>
        </form>
      </DivContainer>
      <div style={{ textAlign: "center" }}>
        <p>
          Forget Password? <a href="/auth/forgetpassword">Reset Now!</a>
        </p>
      </div>
    </>
  );
};

export default FormPost;
