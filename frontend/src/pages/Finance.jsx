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
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import '../styles/Finance.css';

function Finance() {
  const [loading, setLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    try {
      const response = await axios.get('/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTransaction = async () => {
    setLoading(true);
    try {
      const newTransaction = {
        date,
        type,
        product,
        quantity,
        amount,
        notes
      };
      await axios.post('/api/transactions', newTransaction);
      fetchTransactions();
      handleClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finance-container">
      <Grid2 container spacing={3}>
        <Grid2 item xs={12}>
          <Typography variant="h4" gutterBottom className="finance-header">
            Finance Dashboard
          </Typography>
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Card className="finance-card">
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h3">stats.products</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Card className="finance-card">
            <CardContent>
              <Typography variant="h6">Total Suppliers</Typography>
              <Typography variant="h3">stats.suppliers</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} sm={4}>
          <Card className="finance-card">
            <CardContent>
              <Typography variant="h6">Low Stock Items</Typography>
              <Typography variant="h3">stats.lowStock</Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      <Box className="finance-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#82ca9d" name="Daily Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Transactions</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Transaction
        </Button>
      </Box>

      {transactionsLoading ? (
        <Box className="finance-loading">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} className="finance-table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.notes}</TableCell>
                  <TableCell>
                    {/* Add actions like edit/delete here */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} className="finance-dialog">
        <DialogTitle>Create Transaction</DialogTitle>
        <DialogContent className="finance-dialog-content">
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            customInput={<TextField fullWidth margin="normal" />}
          />
          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="finance-dialog-actions">
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateTransaction} color="primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Transaction'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Finance;
