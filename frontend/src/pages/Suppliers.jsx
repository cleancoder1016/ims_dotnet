import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import '../styles/Suppliers.css';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [currentSupplier, setCurrentSupplier] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: ''
  });
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSupplier({
      name: '',
      contact_person: '',
      email: '',
      phone: ''
    });
    setIsEdit(false);
  };

  const handleEdit = (supplier) => {
    setCurrentSupplier(supplier);
    setIsEdit(true);
    handleOpen();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`/api/suppliers/${currentSupplier.id}`, currentSupplier);
      } else {
        await axios.post('/api/suppliers', currentSupplier);
      }
      fetchSuppliers();
      handleClose();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  return (
    <div className="suppliers-container">
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Supplier</Button>
      <TableContainer component={Paper} className="suppliers-table-container">
        <Table className="suppliers-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
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
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEdit(supplier)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(supplier.id)}>Delete</Button>
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
        </DialogContent>
        <DialogActions className="suppliers-dialog-actions">
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEdit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Suppliers;
