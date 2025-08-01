'use client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Users, Phone, AlertCircle } from 'lucide-react';

export default function SupplierForm({ existing, onSuccess }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (existing?._id) {
        await axios.put(`/api/suppliers/${existing._id}`, data);
      } else {
        await axios.post('/api/suppliers', data);
      }
      reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Users className="h-6 w-6 mr-2 text-emerald-600" />
          {existing ? 'Update Supplier' : 'Add New Supplier'}
        </h3>
        <p className="text-slate-600 mt-1">Manage your supplier information and contact details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Users className="h-4 w-4 inline mr-1" />
              Supplier Name
            </label>
            <input
              {...register('name', { 
                required: 'Supplier name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Enter supplier name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Contact Information
            </label>
            <input
              {...register('contact', { 
                required: 'Contact information is required',
                minLength: { value: 5, message: 'Contact must be at least 5 characters' }
              })}
              className={`input-field ${errors.contact ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              placeholder="Phone, email, or address"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.contact.message}
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
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {existing ? 'Updating...' : 'Adding...'}
              </div>
            ) : (
              existing ? 'Update Supplier' : 'Add Supplier'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}