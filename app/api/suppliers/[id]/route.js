import { connectDB } from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function GET(req, { params }) {
  await connectDB();
  const supplier = await Supplier.findById(params.id);
  return Response.json(supplier);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Supplier.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}
