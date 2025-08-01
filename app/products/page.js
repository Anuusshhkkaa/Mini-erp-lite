'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, [refresh]);

  const deleteProduct = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`/api/products/${id}`);
      setRefresh(!refresh);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <ProductForm onSuccess={() => setRefresh(!refresh)} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Supplier</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.quantity}</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.supplierId?.name || 'N/A'}</td>
                  <td className="p-2 border flex gap-2">
                    <Link href={`/products/${product._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
