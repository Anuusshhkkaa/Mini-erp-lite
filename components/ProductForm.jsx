'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProductForm({ existing, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('/api/suppliers').then((res) => setSuppliers(res.data));
    if (existing) reset(existing);
  }, [existing, reset]);

  const onSubmit = async (data) => {
    if (existing?._id) {
      await axios.put(`/api/products/${existing._id}`, data);
    } else {
      await axios.post('/api/products', data);
    }
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Product Name" {...register('name', { required: true })} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Quantity" {...register('quantity', { required: true })} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" {...register('price', { required: true })} className="w-full p-2 border rounded" />
       <select {...register('supplierId', { required: true })} className="w-full p-2 border rounded" required>
  <option value="">Select Supplier</option>
  {suppliers.map(s => (
    <option key={s._id} value={s._id}>{s.name}</option>
  ))}
</select>
{errors.supplierId && <p className="text-red-500 text-sm">Please select a supplier.</p>}

      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" type="submit">
        {existing ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}