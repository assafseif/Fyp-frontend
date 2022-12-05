import React from "react";
import { DivContainer } from "./styles";
import { useState } from "react";
import { postData } from "../../../components/api/ApiMethods";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import Head from "next/head";
// const schema = yup.object().shape({
//   title: yup.string().min(4).max(15).required("Please enter Title"),
//   imageUrl: yup.string().required(),
//   description: yup.string().email().required(),
// });



import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const FormPost = (props) => {
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    nameError: "",
  });

  async function ResendToken(e) {
    e.preventDefault();
    const awaited = await postData(
      `${publicRuntimeConfig.API_URL}/auth/resend/token`,
      formData
    );
  }

  async function submit(e) {
    e.preventDefault();
    const awaited = await postData(
      `${publicRuntimeConfig.API_URL}/auth/signup`,
      formData
    );
    setErrors(() => {
      return {
        emailError: "",
        passwordError: "",
        nameError: "",
      };
    });
    {
      awaited?.error && awaited?.error?.data.length>0 &&
        awaited.error.data.map((p) => {
          if (p.param === "email") {
            setErrors((prev) => {
              return { ...prev, emailError: p.msg };
            });
          } else if (p.param === "password") {
            setErrors((prev) => {
              return { ...prev, passwordError: p.msg };
            });
          } else if (p.param === "name") {
            setErrors((prev) => {
              return { ...prev, nameError: p.msg };
            });
          }
        });
    }

    {
      !awaited.error && setOpen(false);
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
  return open ? (
    <DivContainer>
        <Head>
        <title>Regsiter now !</title>
        </Head>
      <form onSubmit={submit}>
        {errors.emailError && <p>{errors.emailError}</p>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={Change}
        />
        {errors.nameError && <p>{errors.nameError}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
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
          Sign Up
        </Button>
      </form>
    </DivContainer>
  ) : (
    <div style={{ textAlign: "center" }}>
      <p>
        Resend Verification?{" "}
        <a
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={ResendToken}
        >
          Send Now!
        </a>
      </p>
    </div>
  );
};

export default FormPost;
