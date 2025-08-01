'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import SupplierForm from '@/components/SupplierForm';

export default function EditSupplierPage() {
  const { id } = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    axios.get(`/api/suppliers/${id}`).then((res) => setSupplier(res.data));
  }, [id]);

  if (!supplier) return <p className="text-center">Loading...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Supplier</h1>
      <div className="bg-white p-4 rounded shadow">
        <SupplierForm existing={supplier} onSuccess={() => router.push('/suppliers')} />
      </div>
    </div>
  );
}