import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//   };
  
   const PostadPage = () => {
    const [open, setOpen] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const navigate = useNavigate();
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/postad")
    }
    
    return (
      <div>
        <Button onClick={handleOpen}>Post your ad!</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ width: 400 }}>
            <form onSubmit={handleSubmit}>
            <TextField placeholder="Enter your Postal Code" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <TextField placeholder="Enter the product category" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <TextField placeholder="Enter the condition of the item" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <TextField placeholder="Enter the description of the item" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            {/* <TextField placeholder="" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /> */}

            <Button type='submit'>Submit</Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
  

export default PostadPage