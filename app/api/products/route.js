import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Products.js';

export async function GET() {
  await connectDB();
  const products = await Product.find().populate('supplierId');
  return Response.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newProduct = await Product.create(data);
  return Response.json(newProduct);
}
