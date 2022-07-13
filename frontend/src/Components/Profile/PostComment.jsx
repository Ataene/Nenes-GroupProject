import React, {useState, useEffect} from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import Comments from "../Profile/Comment";
import SendIcon from "@mui/icons-material/Send";
import "../Profile/Post.css";

function PostComment({ user, url, postedAds }) {
  
  return (
    <div className="post">
      <div className="post__header">
        <ListItem>
          <ListItemAvatar>
            <Avatar
              className="post__avatar"
              src="https://source.unsplash.com/random"
              alt="User"
            />
          </ListItemAvatar>
          <ListItemText primary="username" secondary="Abu Dhabi, UAE" />
        </ListItem>

        <h4 className="post__text">
          <strong>username: </strong>caption
        </h4>
        <div className="post__comments">
          <Comments />
        </div>
        <form className="post__form">
          <TextField
            label="add comment"
            size="small"
            variant="outlined"
            className="post__input"
            placeholder="add comment"
          />
          <Button variant="contained" size="small" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PostComment;
