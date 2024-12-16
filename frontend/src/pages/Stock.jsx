import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';
import config from '../config';
import '../styles/Stock.css';

function Stock({ stock = [], getProductName }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="stock-container">
      <Typography variant="h4" gutterBottom className="stock-header">
        Stock Levels
      </Typography>
      <TableContainer component={Paper} className="stock-table-container">
        <Table className="stock-table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{getProductName(item.product_id)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{new Date(item.last_updated).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Stock;