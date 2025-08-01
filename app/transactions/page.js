'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '@/components/TransactionForm';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('/api/transactions').then((res) => setTransactions(res.data));
  }, [refresh]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Transactions</h1>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Record Transaction</h2>
        <TransactionForm onSuccess={() => setRefresh(!refresh)} />
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
                <td className="p-2 border font-semibold text-sm">
                  <span className={t.type === 'sale' ? 'text-red-600' : 'text-green-600'}>
                    {t.type.toUpperCase()}
                  </span>
                </td>
                <td className="p-2 border">{t.productId?.name || 'Deleted Product'}</td>
                <td className="p-2 border">{t.quantity}</td>
                <td className="p-2 border text-sm text-gray-600">{new Date(t.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
