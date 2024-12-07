import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  Alert,
} from '@mui/material';
import axios from 'axios';
import '../styles/Suppliers.css';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [currentSupplier, setCurrentSupplier] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    purchase_price: '',
    selling_price: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      setError('Error fetching suppliers');
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setCurrentSupplier({
      name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: ''
    });
  };
  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setCurrentSupplier({
      name: supplier.name,
      contact_person: supplier.contact_person,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address
    });
    setIsEdit(true);
    setOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      setError('Error deleting supplier');
    }
  };
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`/api/suppliers/${selectedSupplier.id}`, currentSupplier);
      } else {
        await axios.post('/api/suppliers', currentSupplier);
      }
      fetchSuppliers();
      handleClose();
    } catch (error) {
      setError('Error saving supplier');
    }
  };

  return (
    <div className="suppliers-container">
      <Typography variant="h4" gutterBottom className="suppliers-header">
        Suppliers
      </Typography>
      {error && <Alert severity="error" className="suppliers-alert">{error}</Alert>}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Supplier
      </Button>
      <TableContainer component={Paper} className="suppliers-table-container">
        <Table className="suppliers-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact_person}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(supplier)}>Edit</Button>
                  <Button onClick={() => handleDelete(supplier.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} className="suppliers-dialog">
        <DialogTitle>{isEdit ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent className="suppliers-dialog-content">
          <TextField
            label="Name"
            value={currentSupplier.name}
            onChange={(e) => setCurrentSupplier({ ...currentSupplier, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Person"
            value={currentSupplier.contact_person}
            onChange={(e) => setCurrentSupplier({ ...currentSupplier, contact_person: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={currentSupplier.email}
            onChange={(e) => setCurrentSupplier({ ...currentSupplier, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={currentSupplier.phone}
            onChange={(e) => setCurrentSupplier({ ...currentSupplier, phone: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={currentSupplier.address}
            onChange={(e) => setCurrentSupplier({ ...currentSupplier, address: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="suppliers-dialog-actions">
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Suppliers;
