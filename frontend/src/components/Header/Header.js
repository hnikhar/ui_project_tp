'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Platform', 'Industries', 'Company', ' Developers', 'Contact Us'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  return (
    <AppBar position="static" className="header" sx={{ backgroundColor: '#120880'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
          component="img"
          sx={{ height: 54 , paddingRight: '50px'}}
          alt="Logo"
          src="/tabapay-logo.svg"
        />
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block', width: '150px' }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Button variant="contained" size="large" sx={{ backgroundColor: 'white', color: 'black'}}>
          Login
        </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;