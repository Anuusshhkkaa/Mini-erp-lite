# Mini ERP Lite

A simple, full-stack ERP (Enterprise Resource Planning) web application built using **Next.js (App Router)**, **MongoDB**, and **Tailwind CSS**. It helps manage products, suppliers, and transactions efficiently with a clean, modern UI.

## 🚀 Features

- 📦 **Product Management**
  - Create, update, delete, and view products
  - Associate each product with a supplier
  - Track quantity and price

- 🧾 **Transaction Handling**
  - Create purchase and sales transactions
  - Automatically update product quantity
  - View a full transaction list with timestamps

- 🧍‍♂️ **Supplier Management**
  - Add, edit, delete suppliers
  - Assign suppliers to products

- 📊 **Dashboard Overview**
  - View key stats at a glance (Products count, Suppliers count, Transaction summary)

- 🔄 **Responsive and Clean UI**
  - Built with Tailwind CSS
  - Component-based design for reusability
  - Professional layout and form structure

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (App Router), React 19, Tailwind CSS
- **Backend**: API routes in Next.js, Mongoose ODM
- **Database**: MongoDB Atlas (Cloud)
- **State Management**: Form state using React Hook Form

## 🗂️ Folder Structure

mini-erp-lite/
├── app/
│ ├── products/
│ ├── suppliers/
│ ├── transactions/
│ ├── layout.js
│ └── page.js
├── components/
│ ├── ProductForm.jsx
│ ├── SupplierForm.jsx
│ └── TransactionForm.jsx
├── lib/
│ └── mongodb.js
├── models/
│ ├── Product.js
│ ├── Supplier.js
│ └── Transaction.js
├── public/
├── styles/
│ └── globals.css
├── .env.local
└── README.md





🙌 Contributing :

Feel free to fork the repo and submit pull requests. Suggestions and feedback are welcome!

✨ Author :

Developed with ❤️ by Anuusshhkkaa


