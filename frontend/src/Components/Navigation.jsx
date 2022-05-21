import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const Navigation = () => {

  return (
    <div>
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardGiftcardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            }}
          >
            NenesPay
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
          </Box>
          <Box  sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Link style={{ textDecoration: 'none' }} to="/signup"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Sign up</Button></Link>
            <Link style={{ textDecoration: 'none' }} to="/login"><Button  sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Navigation;