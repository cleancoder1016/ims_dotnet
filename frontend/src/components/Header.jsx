import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header-container">
      <Typography variant="h4" className="header-title">
        Welcome to the Inventory Management System
      </Typography>
      <Typography variant="subtitle1" className="header-tagline">
        Track, manage, and optimize your inventory effortlessly. Save time and reduce errors with our comprehensive inventory solution.
      </Typography>
      <Box className="header-buttons">
        <Button variant="contained" color="primary" component={Link} to="/products">
          Products
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/suppliers">
          Suppliers
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/finance">
          Finance
        </Button>
      </Box>
    </header>
  );
}

export default Header;