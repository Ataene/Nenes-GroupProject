import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, ListItemIcon, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PieChartIcon from '@mui/icons-material/PieChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import InventoryIcon from '@mui/icons-material/Inventory';

const Sidebar = (props) => {
  const component = props.setComponentToShow
  return (
    <>
      <Box style={{backgroundColor: "rgb(251, 251, 255)"}} flex={1} p={2} sx={{ display: { xs: "none", sm: "block" }, width: 150 }}>
        <List>
            <Typography variant= "h4" mt={2}>PAGES</Typography>
            <ListItem style={{backgroundColor: "green", borderRadius: "30px", height: "45px"}}>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon secondary="Orders" />
                <ListItemText primary="Orders" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton onClick={() => component("Table") } style={{ color: 'blue'}}>
              <ListItemIcon>
                <Link color="inherit"><PeopleAltIcon primary="Employee" /></Link>
                <ListItemText primary="Employee" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <AccountCircleIcon primary="Customer" />
                <ListItemText primary="Customer" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <Typography variant= "h4" mt={2}>APPS</Typography>
            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <CalendarMonthIcon primary="Calendar" />
                <ListItemText primary="Calendar" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <AssuredWorkloadIcon primary="Picker" />
                <ListItemText primary="Picker" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <Typography variant= "h4" mt={2}>CHARTS</Typography>
            <ListItem>
            <ListItemButton onClick={() => component("Line") } style={{ color: 'green'}}>
              <ListItemIcon>
                <StackedLineChartIcon primary="Line" />
                <ListItemText primary="Line" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <PieChartIcon primary="Pie" />
                <ListItemText primary="Pie" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <Typography variant= "h4" mt={2}>MENU</Typography>
            <ListItem>
            <ListItemButton onClick={() => component("Product") } style={{ color: 'green'}}>
              <ListItemIcon>
                <InventoryIcon primary="Products" />
                <ListItemText primary="Products" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
            <ListItem>
            <ListItemButton style={{ color: 'green'}}>
              <ListItemIcon>
                <CurrencyBitcoinIcon primary="Transactions" />
                <ListItemText primary="Transactions" />
              </ListItemIcon>
            </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </>
  )
}

export default Sidebar;