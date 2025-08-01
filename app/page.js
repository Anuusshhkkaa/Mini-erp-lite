'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, Package, AlertTriangle, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const lowStock = products.filter(p => p.quantity < 5);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const outOfStock = products.filter(p => p.quantity === 0);

  const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="card p-6 hover:scale-105 transform transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-gray-100`}>
          <Icon className={`h-8 w-8 ${colorClass}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">Monitor your inventory and business metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          colorClass="text-blue-600"
          trend="+12% this month"
        />
        <StatCard
          title="Inventory Value"
          value={`₹${totalValue.toLocaleString()}`}
          icon={DollarSign}
          colorClass="text-green-600"
          trend="+8% this month"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStock.length}
          icon={AlertTriangle}
          colorClass="text-yellow-600"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock.length}
          icon={ShoppingCart}
          colorClass="text-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-blue-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-primary text-center">
            Add New Product
          </button>
          <button className="btn-secondary text-center">
            Register Supplier
          </button>
          <button className="btn-accent text-center">
            Record Transaction
          </button>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Low Stock Alerts</h2>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {lowStock.length > 0 ? (
              lowStock.map(product => (
                <div key={product._id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">Current stock: {product.quantity} units</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Low Stock
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">All products are sufficiently stocked!</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">New product added</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Stock updated</p>
                <p className="text-xs text-gray-600">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium">Transaction recorded</p>
                <p className="text-xs text-gray-600">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}