import React from "react";
import { useState } from "react";
import Router from "next/router";
import { PostApi, PatchApi } from "../../api/ApiMethods";
import { DivContainer } from "./style";

import Button from "@mui/material/Button";

const ResetPassword = ({ token }) => {
  //NEW STATE FOR ERROR IF EXIST
  const [error, setError] = useState();

  //STATE FOR DATA TO SAVE THEM
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  //WHEN USER WRITE OR ENTER THIS WILL CHANGE AND STORE THESE DATA IN FORMDATA
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  //WHEN USER SUBMIT THIS WILL HAPPEN
  async function handleSubmit(e) {
    // FOR PREVENTING RELOAD
    e.preventDefault();

    try {
      //SENDING DATA TO BACKEND
      const data = await PatchApi(
        formData,
        `${process.env.API_URL}/auth/reset/password/${token}`
      );

      //IF SUCCES REDIRECT TO LOGINPAGE
      if (data.success) {
        setTimeout(() => {
          Router.push("/auth/login");
        }, 1000);
      }

      //ELSE SETTING ERROR
      setError(data?.error?.message || data.message);
    } catch (error) {
      next(err);
    }
  }

  return (
    <>
      <DivContainer>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit"> Submit </Button>
        </form>
      </DivContainer>
    </>
  );
};

export default ResetPassword;
