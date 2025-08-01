import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id).populate('supplierId');
  return Response.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}

// --------------------------------------
// app/api/suppliers/route.js
// --------------------------------------
import { connectDB } from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function GET() {
  await connectDB();
  const suppliers = await Supplier.find();
  return Response.json(suppliers);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newSupplier = await Supplier.create(data);
  return Response.json(newSupplier);
}
