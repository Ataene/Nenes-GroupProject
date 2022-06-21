import React, { useState } from 'react'
import { Box, Container, Button, Typography, Modal, Link } from '@mui/material';
import Feeds from '../Feeds';
import TopProfile from './TopProfile';
import dropSelections from "../DropSelections";
import Wish from "./WishList"
import Test from "../WantList/Test";

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
            href="/test"
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
            <dropSelections
              visible={modalVisible}
              onCancel={handleCancel}
              sx={{ margin: "5px" }}
              variant="outlined"
              size="large"
            />
          )}
        </Box>
        <hr />
        <TopProfile /> /* We want to render this TopProfile Conditionally based on the onClick event*/
        <Feeds />
      </Container>
    </Box>
  );
}

export default MiddleBar;