'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function SupplierForm({ existing, onSuccess }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (existing?._id) {
      await axios.put(`/api/suppliers/${existing._id}`, data);
    } else {
      await axios.post('/api/suppliers', data);
    }
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Supplier Name" {...register('name', { required: true })} className="w-full p-2 border rounded" />
        <input placeholder="Contact Info" {...register('contact', { required: true })} className="w-full p-2 border rounded" />
      </div>
      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" type="submit">
        {existing ? 'Update Supplier' : 'Add Supplier'}
      </button>
    </form>
  );
}