import React, { useState } from "react";
import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText, Card } from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import InventoryIcon from "@mui/icons-material/Inventory";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';

const LeftBar = () => {  
  const [ active, setActive ] = useState('');


  return (
    <>
      <Box sx={{ 
        flex: "1.5", 
        // backgroundColor: "#A5BECC", 
        position: "sticky", 
        maxHeight: "auto"
      }}>
        <Card>
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItemButton>
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
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary="Market" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton><hr />
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CircleNotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notify" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <OndemandVideoIcon />
              </ListItemIcon>
              <ListItemText primary="Video" />
            </ListItemButton>
          </List>
        </Card>
      </Box>
    </>
  );
};

export default LeftBar;
