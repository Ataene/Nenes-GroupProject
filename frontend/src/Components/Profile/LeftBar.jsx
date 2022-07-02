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
                <RssFeedIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ChatIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Market" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <InventoryIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton><hr />
            <ListItemButton>
              <ListItemIcon>
                <WorkIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Career" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CircleNotificationsIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Notify" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LiveHelpIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonthIcon sx={{ color: "#B8F1B0"}} />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <OndemandVideoIcon sx={{ color: "#B8F1B0"}} />
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
