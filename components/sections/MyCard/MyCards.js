import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Router from "next/router";


import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { getfavorites } from "../../../features/favoriteSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediaCard({ post, deletePost }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmDelete = async () => {
    deletePost(post._id);
    dispatch(getfavorites());
    setOpen(false);
    setTimeout(() => {
      Router.push("/");
    }, 1000);

  };

  console.log('here',post.videoUrl.replace("watch?v=", "embed/"))
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
        <Button variant="outlined" size="small" startIcon={<EditIcon />}>
          <a href={`/post/edit-post/${post._id}`}>Edit</a>
        </Button>
        <Button
          onClick={handleClickOpen}
          size="small"
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Are you sure you want to delete this Post?"}
          </DialogTitle>
    
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={confirmDelete}>Agree</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
