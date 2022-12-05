import { postData } from "../../components/api/ApiMethods";
import Router from "next/router";
import Head from "next/head";
import React from "react";

const verify = (data) => {
  //IF DATA SUCCESS THATS MEAN THE USER IS VERIFIED

  if (data?.data?.success) {
    
    {setTimeout(() => {
      Router.push("/auth/login");
    }, 1000)}
    return  <>
        <Head>
          <title>Verification</title>
        </Head>
        <h1>{data.data.message}</h1>
        <h2>You’re almost done!</h2>
        
      </>
    
  } else {
    //ELSE RETURN ERROR MESSAGE
    {setTimeout(() => {
      Router.push("/auth/login");
    }, 1000)}
    return <h1>Verification Failed!</h1>;
   
  }
};
export async function getServerSideProps(context) {
  //USE GET API TO SEND TOKEN TO SERVER SIDE AND CHECK WITH IT

  const data = await postData(
    `${process.env.API_URL}/auth/getverified/${context.query.token}`
  );
  return {
    props:{
      data:data
    }
  }
}

export default verify;
