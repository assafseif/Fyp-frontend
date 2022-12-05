import React from "react";
import { makeStyles } from "@material-ui/core";
import { DeletePost } from "../api/ApiMethods";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSelector, useDispatch } from "react-redux";
import { getfavorites } from "../../features/FavoriteSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(
  { open, FavoriteClickOpen, FavoriteClose },
  context
) {
  const favoritesPost = useSelector(
    (state) => state?.Favorite?.favorites?.posts
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const RemoveFromFavorite = async (postId) => {
    await DeletePost(`${process.env.API_URL}/remove-from-favorite/${postId}`);
    dispatch(getfavorites());
  };

  useEffect(() => {
    dispatch(getfavorites());
  }, []);
  const useStyles = makeStyles({
    newPosOfDialog: {
      position: "absolute",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  });
  const classes = useStyles();

  return (
    <div>
      <Dialog
        sx={{
          position: "absolute",
          // top: "50%",
          left: "70%",
          // transform: "translate(-50%, -50%)",
        }}
        fullScreen
        open={open}
        onClose={FavoriteClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ backgroundColor: "#b4813f", position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={FavoriteClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Favorite
            </Typography>
            <Button autoFocus color="inherit" onClick={FavoriteClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {favoritesPost?.map((post) => {
            return (
              <>
                <ListItem button>
                  <ListItemText
                    primary={post.postId?.title}
                    onClick={() => {
                      window.location.replace(post.postId.videoUrl);
                    }}
                  />
                  <div style={{ justifyContent: "center" }}>
                    <p
                      style={{
                        margin: "0",
                        paddingTop: "0",
                        paddingLeft: "6.5px",
                      }}
                    >
                      <FavoriteIcon
                        onClick={() => {
                          RemoveFromFavorite(post?.postId?._id);
                        }}
                      />
                    </p>
                  </div>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Dialog>
    </div>
  );
}
