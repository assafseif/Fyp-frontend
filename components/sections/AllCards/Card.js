import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../../../features/postSlice";
import { getfavorites } from "../../../features/FavoriteSlice";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import jsonwebtoken from "jsonwebtoken";
import { postData, DeletePost } from "../../api/ApiMethods";
import { isPermitted } from "../../../lib/token";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
import { check } from "../../../features/FavoriteSlice";
export default function MediaCard({ post }, context) {
  const [open, setOpen] = React.useState(false);
  const [isAdded, setAdd] = React.useState(false);
  const [isAdded2, setAdd2] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getfavorites());
  }, []);

  const favorites = useSelector((state) => state.Favorite.favorites);
  useEffect(() => {
    favorites?.posts?.map((p) => {
      if (p?.postId?._id === post._id) {
        setAdd(true);
      }
    });
  }, [favorites]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  const AddToFavorite = async () => {
    await postData(`${process.env.API_URL}/add-to-favorite/${post._id}`);

    dispatch(getfavorites());
    setAdd(true);
    setOpen(false);
  };
  const RemoveFromFavorite = async () => {
    await DeletePost(`${process.env.API_URL}/remove-from-favorite/${post._id}`);

    dispatch(getfavorites());
    setAdd(false);
    setOpen(false);
  };

  return (
    <Card sx={{ width: 345, margin: "15px" }}>
      <iframe
        width="350"
        height="250"
        src={post.videoUrl.replace("watch?v=", "embed/")}
      ></iframe>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>

      <CardActions>
        {isAdded ? (
          <Button
            style={{ color: "black" }}
            size="large"
            startIcon={<FavoriteIcon />}
            onClick={handleClickOpen}
          ></Button>
        ) : (
          <Button
            style={{ color: "black" }}
            size="large"
            startIcon={<FavoriteBorderIcon />}
            onClick={handleClickOpen}
          ></Button>
        )}

        {isAdded ? (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Remove this post from fAVORITE?"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={RemoveFromFavorite}>Agree</Button>
            </DialogActions>
          </Dialog>
        ) : (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Add this Lesson To Favorites?"}</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={AddToFavorite}>Agree</Button>
            </DialogActions>
          </Dialog>
        )}
      </CardActions>
    </Card>
  );
}
