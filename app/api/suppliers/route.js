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