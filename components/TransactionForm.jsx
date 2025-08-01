'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TransactionForm({ onSuccess }) {
  const { register, handleSubmit, reset, formState:{ errors } } = useForm();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  const onSubmit = async (data) => {
    await axios.post('/api/transactions', data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select {...register('productId')} className="w-full p-2 border rounded" required>
          <option value="">Select Product</option>
          {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select {...register('type')} className="w-full p-2 border rounded" required>
          <option value="">Transaction Type</option>
          <option value="purchase">Purchase</option>
          <option value="sale">Sale</option>
        </select>
        <input type="number" placeholder="Quantity" {...register('quantity', { required: true })} className="w-full p-2 border rounded" />
      </div>
      <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700" type="submit">
        Add Transaction
      </button>
    </form>
  );
}
