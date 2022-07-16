import React, {useState, useEffect} from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Button } from "@mui/material";
import Comments from "../Profile/Comment";
import SendIcon from "@mui/icons-material/Send";
import "../Profile/Post.css";

function PostComment({ user, url, postedAds }) {
  
  return (
    <div className="post">
      <div className="post__header">
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
