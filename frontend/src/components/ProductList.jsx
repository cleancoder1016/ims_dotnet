import React from 'react';
import '../styles/Products.css';

function ProductList({ products }) {
  return (
    <table className="full-width-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Purchase Price</th>
          <th>Selling Price</th>
          <th>Supplier</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.purchasePrice}</td>
            <td>{product.sellingPrice}</td>
            <td>{product.supplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;