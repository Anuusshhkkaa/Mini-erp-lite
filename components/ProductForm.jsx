'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Package, DollarSign, Hash, Users, AlertCircle } from 'lucide-react';

export default function ProductForm({ existing, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/suppliers')
      .then((res) => {
        setSuppliers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    
    if (existing) reset(existing);
  }, [existing, reset]);

  const onSubmit = async (data) => {
    try {
      if (existing?._id) {
        await axios.put(`/api/products/${existing._id}`, data);
      } else {
        await axios.post('/api/products', data);
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Package className="h-6 w-6 mr-2 text-blue-600" />
          {existing ? 'Update Product' : 'Add New Product'}
        </h3>
        <p className="text-slate-600 mt-1">Fill in the details below to manage your product inventory</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Package className="h-4 w-4 inline mr-1" />
              Product Name
            </label>
            <input
              {...register('name', { 
                required: 'Product name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Hash className="h-4 w-4 inline mr-1" />
              Quantity
            </label>
            <input
              type="number"
              {...register('quantity', { 
                required: 'Quantity is required',
                min: { value: 0, message: 'Quantity cannot be negative' }
              })}
              className={`input-field ${errors.quantity ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Enter quantity"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' }
              })}
              className={`input-field ${errors.price ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Users className="h-4 w-4 inline mr-1" />
              Supplier
            </label>
            <select
              {...register('supplierId', { required: 'Please select a supplier' })}
              className={`select-field ${errors.supplierId ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            >
              <option value="">Select a supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            {errors.supplierId && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.supplierId.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors duration-200"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {existing ? 'Updating...' : 'Adding...'}
              </div>
            ) : (
              existing ? 'Update Product' : 'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}