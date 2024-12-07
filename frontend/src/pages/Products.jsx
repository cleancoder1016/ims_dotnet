import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    purchase_price: '',
    selling_price: '',
    supplier_id: ''
  });
  const [suppliers, setSuppliers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpen = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setIsEdit(true);
    } else {
      setCurrentProduct({
        name: '',
        purchase_price: '',
        selling_price: '',
        supplier_id: ''
      });
      setIsEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct({
      name: '',
      purchase_price: '',
      selling_price: '',
      supplier_id: ''
    });
    setIsEdit(false);
  };

  const handleSubmit = async () => {
    try {
      const productData = {
        ...currentProduct,
        purchase_price: parseFloat(currentProduct.purchase_price),
        selling_price: parseFloat(currentProduct.selling_price),
        supplier_id: currentProduct.supplier_id || null
      };

      if (isEdit) {
        await axios.put(`/api/products/${currentProduct.id}`, productData);
      } else {
        await axios.post('/api/products', productData);
      }
      handleClose();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${Number(product.purchase_price).toFixed(2)}</TableCell>
                <TableCell>${Number(product.selling_price).toFixed(2)}</TableCell>
                <TableCell>
                  {suppliers.find(s => s.id === product.supplier_id)?.name || 'No Supplier'}
                </TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(product)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(product.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Purchase Price"
            type="number"
            fullWidth
            value={currentProduct.purchase_price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, purchase_price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Selling Price"
            type="number"
            fullWidth
            value={currentProduct.selling_price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, selling_price: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Supplier"
            fullWidth
            value={currentProduct.supplier_id || ''}
            onChange={(e) => setCurrentProduct({ ...currentProduct, supplier_id: e.target.value })}
          >
            <MenuItem value="">Select a supplier</MenuItem>
            {suppliers.map((supplier) => (
              <MenuItem key={supplier.id} value={supplier.id}>
                {supplier.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Products;
