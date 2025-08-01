'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  const lowStock = products.filter(p => p.quantity < 5);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-semibold">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Total Inventory Value</p>
          <p className="text-2xl font-semibold">₹{totalValue}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-2xl font-semibold text-red-500">{lowStock.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Low Stock Alerts</h2>
        <ul className="list-disc ml-6 space-y-1">
          {lowStock.length > 0 ? lowStock.map(p => (
            <li key={p._id}>{p.name} (Qty: {p.quantity})</li>
          )) : <li>All products are sufficiently stocked.</li>}
        </ul>
      </div>
    </div>
  );
}
