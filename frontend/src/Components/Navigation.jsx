import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Toolbar, IconButton, Typography, Container, Button   } from '@mui/material';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';


const Navigation = () => {

  return (
    <div>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardGiftcardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, zIndex: 999 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              top: "0"
            }}
          >
            HundiePay
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
            </IconButton>
          </Box>
          <CardGiftcardIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box style={{ textDecoration: 'none' }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link style={{ textDecoration: 'none' }} to="/products"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Products</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/pricing"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Pricing</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/blog"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Blog</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/about"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>About</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/dashboard"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button></Link>
          </Box>
          <Box  sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Link style={{ textDecoration: 'none' }} to="/signup"><Button variant="outlined" color="warning" sx={{ my: 2, color: 'white', display: 'flex', flexDirection: "row"}}><ExitToAppIcon />Register</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/login"><Button variant="outlined" color="warning" sx={{ my: 2, mx: 1, color: 'white', display: 'flex', flexDirection: "row" }}><LoginIcon />Login</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/cart"><Button variant="outlined" color="warning" sx={{ my: 2, color: 'white', display: 'flex', flexDirection: "row" }}><AddShoppingCartIcon />Cart(0)</Button></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Navigation;