import React, { useState } from 'react'

import { Box, Container, Button, Typography, Modal, Link } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
import Feeds from '../Feeds';
import TopProfile from '../TopProfile';
import ModalState from "../ModalState";
import CategorySelect from "../CategorySelect";
import Wish from "../WishList"




const MiddleBar = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }

  return (
    <Box sx={{ flex: "8.5", backgroundColor: "#FFE6E6" }}>
      <Container>
        <Box sx={{ margin: "5px" }}>
          <Button sx={{ margin: "5px" }} variant="outlined" size="large">
            Messenger
          </Button>
          <Button sx={{ margin: "5px" }} variant="outlined" size="large">
            Products
          </Button>
          <Button sx={{ margin: "5px" }} variant="outlined" size="large">
            Categories
          </Button>
          <Button sx={{ margin: "5px" }} variant="outlined" size="large">
            Services
          </Button>
          <Button
            open={open}
            onClick={() => setOpen(false)}
            variant="outlined"
            size="large"
            href="/wantlist"
          >
            Want List
          </Button>
          <Button
            onClick={handleModalOpen}
            sx={{ margin: "5px" }}
            variant="outlined"
            size="large"
          >
            Post Ad
          </Button>
          {modalVisible && (
            <CategorySelect
              visible={modalVisible}
              onCancel={handleCancel}
              sx={{ margin: "5px" }}
              variant="outlined"
              size="large"
            />
          )}
        </Box>
        <hr />
        <TopProfile />
        <Feeds />
      </Container>
    </Box>
  );
}

export default MiddleBar;