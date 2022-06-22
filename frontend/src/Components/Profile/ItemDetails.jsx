import Close from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton, Slide } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Colors } from '../styles/theme';

function SlideTransition(props) {
    return <Slide direction="down" {...props} />
}


function ItemDetails({ open, onClose, item }) {
  return (
      <Dialog TransitionComponent={SlideTransition}
          variant="permanent"
          open={open}
          fullScreen
      >
          <DialogTitle sx={{ background: Colors.secondary }}>
              <Box 
                  display={"flex"}
                  alignItems="center"
                  justifyContent={"center"}>
                  Product Title
                  <IconButton onClick={onClose}>
                  <Close />
                  </IconButton>
              </Box>
          </DialogTitle>
          <DialogContent>
          
          </DialogContent>
      
      </Dialog>
  )
}

export default ItemDetails