'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SupplierForm from '@/components/SupplierForm';
import Link from 'next/link';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('/api/suppliers').then((res) => setSuppliers(res.data));
  }, [refresh]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Suppliers</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
        <SupplierForm onSuccess={() => setRefresh(!refresh)} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Supplier List</h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(s => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.contact}</td>
                <td className="p-2 border">
                  <Link href={`/suppliers/${s._id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
