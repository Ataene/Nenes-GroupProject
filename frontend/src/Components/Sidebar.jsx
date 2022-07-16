import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Link, Card } from '@mui/material'
import { Box } from '@mui/system'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = (props) => {

  const component = props.setComponentToShow
  return (
    <>
      <Box style={{maxHeight: "auto"}} flex={1} sx={{ display: { xs: "none", sm: "block" }, width: 150 }}>
      <Card sx={{width: "150px", height: "550px"}}>
        <List component="nav">

            <ListItem>
            <ListItemButton onClick={() => component("Table") } style={{ color: 'blue'}}>
              <ListItemIcon >
                <Link color="inherit"><PeopleAltIcon primary="Users" sx={{color: "#B8F1B0", marginRight: "10px"}} /></Link>
                <ListItemText primary="Users" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>

            
            <ListItem>
            <ListItemButton onClick={() => component("Table") } style={{ color: 'blue'}}>
              <ListItemIcon >
                <Link color="inherit"><PeopleAltIcon primary="Users" sx={{color: "#B8F1B0", marginRight: "10px"}} /></Link>
                <ListItemText primary="Users" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>


            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <AccountCircleIcon primary="Customer" sx={{color: "#B8F1B0", marginRight: "10px"}} />
                <ListItemText primary="Customer" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton onClick={() => component("Line") } style={{ color: 'green'}}>
              <ListItemIcon>
                <StackedLineChartIcon primary="Line" sx={{color: "#B8F1B0", marginRight: "10px"}}/>
                <ListItemText primary="Line" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton onClick={() => component("Product") } style={{ color: 'green'}}>
              <ListItemIcon>
                <InventoryIcon primary="Products"  sx={{color: "#B8F1B0", marginRight: "10px"}}/>
                <ListItemText primary="Products" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
        </List>
      </Card>
      </Box>
    </>
  )
}

export default Sidebar;