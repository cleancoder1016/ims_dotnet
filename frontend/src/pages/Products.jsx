import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

function Products() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    purchase_price: '',
    selling_price: '',
    supplier_id: ''
  });
  const [suppliers, setSuppliers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.apiBaseUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpen = () => {
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

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEdit(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiBaseUrl}/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`${config.apiBaseUrl}/products/${currentProduct.id}`, currentProduct);
      } else {
        await axios.post(`${config.apiBaseUrl}/products`, currentProduct);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Product</Button>
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
                <TableCell>{product.purchase_price}</TableCell>
                <TableCell>{product.selling_price}</TableCell>
                <TableCell>{product.supplier.name}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
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
            label="Name"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Purchase Price"
            value={currentProduct.purchase_price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, purchase_price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Selling Price"
            value={currentProduct.selling_price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, selling_price: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Supplier"
            value={currentProduct.supplier_id}
            onChange={(e) => setCurrentProduct({ ...currentProduct, supplier_id: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Products;
