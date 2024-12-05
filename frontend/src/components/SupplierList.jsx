import React from 'react';

const SupplierList = ({ suppliers }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.name}</td>
                        <td>{supplier.contact}</td>
                        <td>{supplier.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SupplierList;