import React from "react";
import { DivContainer } from "./styles";
import { useState } from "react";
import { postData, PatchApi } from "../../api/ApiMethods";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { myPosts } from "../../../features/postSlice";

// const schema = yup.object().shape({
//   title: yup.string().min(4).max(15).required("Please enter Title"),
//   videoUrl: yup.string().required(),
//   description: yup.string().email().required(),
// });

import Button from "@mui/material/Button";

const FormPost = (props, context) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [EditMode, SetEditMode] = useState(props?.data?.success);
  const data = props.data?.data;

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    title: data?.title || "",
    videoUrl: data?.videoUrl || "",
    description: data?.description || "",
  });
  function submit(e) {
    e.preventDefault();
    if (EditMode) {
      const awaited = PatchApi(
        formData,
        `${process.env.API_URL}/edit-post/${data._id}`
      );
      router.push("/post/my-posts");
      dispatch(myPosts());
    } else {
      postData(`${process.env.API_URL}/add-post`, formData);

      setFormData((prevFormData) => {
        return {
          title: "",
          videoUrl: "",
          description: "",
        };
      });
    }

    handleClickOpen();
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
      <DivContainer>
        <form onSubmit={submit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={Change}
          />
          <input
            type="text"
            placeholder="video Url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={Change}
          />

          <textarea
            type="text"
            placeholder="description"
            name="description"
            value={formData.description}
            onChange={Change}
          />
          <Button variant="outlined" size="medium" type="submit">
            {EditMode ? "Edit " : "Add "}Post
          </Button>
        </form>
      </DivContainer>
    </>
  );
};

export default FormPost;
