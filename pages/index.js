import Body from "../components/body/body";
import { useSelector, useDispatch } from "react-redux";
import getConfig from "next/config";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { getPosts } from "../features/postsSlice";
import MyCard from "../components/sections/AllCards/Card";
import { useRouter } from "next/router";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { getfavorites } from "../features/FavoriteSlice";
import { parseCookies } from "nookies";
import Head from "next/head";

const FormContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 3rem;
  p {
    width: 200px;
    position: static;
    color: red;
  }
  input,
  textarea {
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    display: block;

    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input select,
  input:focus,
  input::placeholder,
  textarea select,
  textarea:focus,
  textarea::placeholder {
    color: #b4813f;
    font-size: 16px;
    letter-spacing: 1px;
  }
`;

const Divcontainer = styled.h1`
  text-align: center;
`;

const { publicRuntimeConfig } = getConfig();

export default function Home(context) {
  const router = useRouter();
  const [AllPost, setAllPost] = useState([]);
  const [pagecount, setPage] = useState(1);

  const page = router.query.page || 1;
  const perpage = 2;
  const jwt = parseCookies(context).jwt || null;
  const dispatch = useDispatch();

  //STATE FOR DATA TO SAVE THEM
  const [formData, setFormData] = useState({
    search: "",
  });

  function FormChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    setPage(page);
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.API_URL}/get-post?page=${page}&search=${formData.search}`
      );
      const data = await res.json();
      setAllPost(data);
    };

    fetchData();
  }, [page, formData.search]);

  useEffect(() => {
    if (!jwt) {
      router.push("/auth/login");
    }
    dispatch(getPosts());
    dispatch(getfavorites());
  }, []);

  const count = Math.ceil(AllPost?.Posts?.length / perpage);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const favorites = useSelector((state) => state.Favorite.favorites);

  if (isLoading) {
    return (
      <Divcontainer>
        <CircularProgress />
      </Divcontainer>
    );
  }
  const handleChange = (e, p) => {
    router.push(`?page=${p}`);
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Body />
      <FormContainer>
        <input
          type="text"
          placeholder="search"
          name="search"
          value={formData.search}
          onChange={FormChange}
        />
      </FormContainer>
      <div style={{ display: "flex" }}>
        {AllPost?.Posts?.map((post, index) => {
          return <MyCard post={post} key={index} />;
        })}
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Stack spacing={2}>
          <Pagination
            count={count}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const page = context.query.page || 1;
//   const per_page = 5;
//   const res = await fetch(`${process.env.API_URL}/get-post?page=${page}`);
//   const data = await res.json();
//   return {
//     props: {
//       posts: data,
//       page: +page,
//       perpage: per_page,
//     },
//   };
// }
