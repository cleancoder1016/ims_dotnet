import React from 'react';
import ProductList from '../components/ProductList.jsx';

function Products() {
    return (
        <div>
            <h1>Products Page</h1>
            <ProductList products={[]} />
        </div>
    );
}

export default Products;

