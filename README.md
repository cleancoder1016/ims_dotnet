# Inventory Management System (.NET)

This is an Inventory Management System built with ASP.NET Core and React. The system allows you to manage products, suppliers, and stock levels.

## Project Structure

```
├── LICENSE
├── 

README.md


├── backend
│   ├── Controllers
│   │   ├── ProductController.cs
│   │   └── SupplierController.cs
│   ├── Data
│   │   └── ApplicationDbContext.cs
│   ├── InventoryManagementSystem.csproj
│   ├── Models
│   │   ├── Product.cs
│   │   ├── Supplier.cs
│   │   └── Stock.cs
│   ├── Program.cs
│   ├── Properties
│   │   └── launchSettings.json
│   ├── Repositories
│   │   ├── IProductRepository.cs
│   │   ├── ISupplierRepository.cs
│   │   ├── ProductRepository.cs
│   │   └── SupplierRepository.cs
│   ├── Services
│   │   ├── ProductService.cs
│   │   └── SupplierService.cs
│   ├── Startup.cs
│   ├── appsettings.Development.json
│   ├── appsettings.json
│   └── backend.http
├── frontend
│   ├── 

README.md


│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components
│       │   ├── Button.jsx
│       │   ├── Header.jsx
│       │   ├── ProductList.jsx
│       │   └── SupplierList.jsx
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── pages
│       │   ├── Dashboard.jsx
│       │   ├── Products.jsx
│       │   ├── Stock.jsx
│       │   └── Suppliers.jsx
│       ├── reportWebVitals.js
│       ├── setupTests.js
│       └── styles
│           ├── Financial.css
│           ├── Products.css
│           ├── Stock.css
│           └── Suppliers.css
└── 

ims_dotnet.sln


```

## Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (for the frontend)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Setup

### Backend

1. Navigate to the `backend` directory:

   ```sh
   cd backend
   ```

2. Restore the .NET dependencies:

   ```sh
   dotnet restore
   ```

3. Update the database with the latest migrations:

   ```sh
   dotnet ef database update
   ```

4.

 Run

 the backend server:

   ```sh
   dotnet run
   ```

### Frontend

1. Navigate to the `frontend` directory:

   ```sh
   cd frontend
   ```

2. Install the Node.js dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

## Usage

- The backend server will be running on `http://localhost:5000` (HTTP) and `https://localhost:5001` (HTTPS).
- The frontend development server will be running on `http://localhost:3000`.

## API Endpoints

### Products

- `GET /api/products` - Retrieve all products
- `GET /api/products/{id}` - Retrieve a specific product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/{id}` - Update an existing product
- `DELETE /api/products/{id}` - Delete a product

### Suppliers

- `GET /api/suppliers` - Retrieve all suppliers
- `GET /api/suppliers/{id}` - Retrieve a specific supplier by ID
- `POST /api/suppliers` - Create a new supplier
- `PUT /api/suppliers/{id}` - Update an existing supplier
- `DELETE /api/suppliers/{id}` - Delete a supplier

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

