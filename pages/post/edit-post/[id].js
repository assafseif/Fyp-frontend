import { PatchApi } from "../../../components/api/ApiMethods";
import { getData } from "../../../components/api/ApiMethods";
import { parseCookies } from "nookies";
import FormPost from "../../../components/sections/FormPost/FormPost";
import React from "react";
import Head from "next/head";

const id = (props) => {
  return (
    <>
      <Head>
        <title>Edit Page</title>
      </Head>
      <FormPost data={props.data} />
    </>
  );
};

//NOW WE EXTRACT STUDENT WITH SPECIFIC ID AND HERE WHE SHOULD BE THE CREATOR TO FETCH IT AND SEND IT TI STUDENT FORM
export async function getServerSideProps(context) {
  //EXTRACTING JWT FROM COOKIES

  //USE GET API TO GET STUDENT
  const data = await getData(
    `${process.env.API_URL}/get-post/${context.params.id}`,
    context
  );
  return {
    props: {
      data,
    },
  };
}

export default id;
