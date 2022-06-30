import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

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

  return (
    <div>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message=""
        key={transition ? transition.name : ''}
      />
    </div>
  );
}
export default ChatBox;
