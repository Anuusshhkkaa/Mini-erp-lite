'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Receipt, Package, Hash, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

export default function TransactionForm({ onSuccess }) {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const transactionType = watch('type');

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/transactions', data);
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Receipt className="h-6 w-6 mr-2 text-purple-600" />
          Record New Transaction
        </h3>
        <p className="text-slate-600 mt-1">Track your inventory movements and transactions</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Package className="h-4 w-4 inline mr-1" />
              Product
            </label>
            <select
              {...register('productId', { required: 'Please select a product' })}
              className={`select-field ${errors.productId ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            >
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product._id} value={product._id}>
                  {product.name} (Stock: {product.quantity})
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.productId.message}
              </p>
            )}
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Transaction Type
            </label>
            <select
              {...register('type', { required: 'Please select transaction type' })}
              className={`select-field ${errors.type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
            >
              <option value="">Select type</option>
              <option value="purchase">
                📈 Purchase (Stock In)
              </option>
              <option value="sale">
                📉 Sale (Stock Out)
              </option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.type.message}
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
                min: { value: 1, message: 'Quantity must be at least 1' }
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
        </div>

        {/* Transaction Type Indicator */}
        {transactionType && (
          <div className={`p-4 rounded-lg border-2 border-dashed ${
            transactionType === 'purchase' 
              ? 'border-emerald-300 bg-emerald-50' 
              : 'border-red-300 bg-red-50'
          }`}>
            <div className="flex items-center">
              {transactionType === 'purchase' ? (
                <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className={`font-medium ${
                transactionType === 'purchase' ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {transactionType === 'purchase' 
                  ? 'This will increase your inventory stock' 
                  : 'This will decrease your inventory stock'
                }
              </span>
            </div>
          </div>
        )}

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
            className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Recording...
              </div>
            ) : (
              'Record Transaction'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}