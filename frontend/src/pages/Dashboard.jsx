import React, { useState, useEffect } from 'react';
import { Grid2, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    suppliers: 0,
    lowStock: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsRes = await axios.get('/api/products');
        const suppliersRes = await axios.get('/api/suppliers');
        const stockRes = await axios.get('/api/stock');
        
        setStats({
          products: productsRes.data.length,
          suppliers: suppliersRes.data.length,
          lowStock: stockRes.data.filter(item => item.quantity < 10).length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Grid2 container spacing={3}>
      <Grid2 item xs={12}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h3">stats.products</Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Suppliers</Typography>
            <Typography variant="h3">stats.suppliers</Typography>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 item xs={12} sm={4}>
        <Card>
          <CardContent>
          <Typography variant="h6">Low Stock Items</Typography>
          <Typography variant="h3">stats.lowStock</Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default Dashboard;
