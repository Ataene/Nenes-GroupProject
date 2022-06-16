import React from "react";
import {
  Box,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import InventoryIcon from "@mui/icons-material/Inventory";

const LeftBar = () => {  
  return (
    <>
      <Box sx={{ 
        flex: "1.5", 
        backgroundColor: "#A5BECC", 
        position: "sticky", 
        maxHeight: "600px"
      }}>
        <Container>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItemButton active>
              <ListItemIcon>
                <RssFeedIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton><hr />
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </List>
        </Container>
      </Box>
    </>
  );
};

export default LeftBar;
