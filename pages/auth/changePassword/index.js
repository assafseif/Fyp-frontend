import React from "react";
import { DivContainer } from "./styles";
import { useState } from "react";
import { PatchApi } from "../../../components/api/ApiMethods";
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
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPasswordError: "",
    newPasswordError: "",
  });
  async function submit(e) {
    setErrors(() => {
      return {
        oldPasswordError: "",
        newPasswordError: "",
      };
    });
    e.preventDefault();

    const awaited = await PatchApi(
      formData,
      `${publicRuntimeConfig.API_URL}/auth/change/password`
    );

    {
      awaited?.error?.errors?.length > 0 &&
        awaited.error.errors.map((p) => {
          if (p.param === "oldPassword") {
            setErrors((prev) => {
              return { ...prev, oldPasswordError: p.msg };
            });
          }
        });
    }

    {
      awaited.error &&
        !awaited.error.errors &&
        setErrors((prev) => {
          return { ...prev, newPasswordError: awaited.error };
        });
    }

    {
      awaited.messageError &&
        setErrors((prev) => {
          return { ...prev, messageError: awaited.messageError };
        });
    }
    {
      awaited.success && router.push("/");
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
        <title>Change Your Password</title>
      </Head>
      <DivContainer>
        <form onSubmit={submit}>
          {errors.oldPasswordError && <p>{errors.oldPasswordError}</p>}
          {errors.newPasswordError && <p>{errors.newPasswordError}</p>}

          <input
            type="password"
            placeholder="Old Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={Change}
          />

          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={Change}
          />

          <Button variant="outlined" size="medium" type="submit">
            Reset!
          </Button>
        </form>
      </DivContainer>
    </>
  );
};

export default FormPost;
