import ResetPasswrod from "../../components/auth/resetPassword/ResetPasswrod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";


// RESETPASSWORD
const resetPassword = () => {
  //EXTRACT TOKEN FROM QUERY AND SENDIT TO SERVER SIDE

  const router = useRouter();
  const { token } = router.query;
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      {/* RESET PASSWORD FORM TO SEND NEW PASSWORD */}

      <ResetPasswrod token={token} />
    </>
  );
};

export default resetPassword;
