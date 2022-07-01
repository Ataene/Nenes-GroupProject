import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import ChatIcon from "@mui/icons-material/Chat";
import AttachFileIcon from '@mui/icons-material/AttachFile';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}
const ChatBox = () =>  {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [ chat, setChat ] = useState('')

  return (
    <div>
      <Button onClick={handleClick(TransitionUp)}><ChatIcon /></Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        color="red"
        message={
        <>
          <form>
          <AttachFileIcon />
          <input
          value={chat}
          color="green"
          onChange={(e) => setChat(e.target.value)} />
          <Button>Send</Button>
          </form>
        </>}
        key={transition ? transition.name : ''}
      />
    </div>
  );
}
export default ChatBox;
