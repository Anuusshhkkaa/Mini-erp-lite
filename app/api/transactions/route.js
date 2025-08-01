import { connectDB } from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Product from '@/models/Products.js';

export async function GET() {
  await connectDB();
  const txns = await Transaction.find().populate('productId');
  return Response.json(txns);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const txn = await Transaction.create(data);

  const product = await Product.findById(data.productId);
  if (data.type === 'purchase') {
    product.quantity += data.quantity;
  } else {
    product.quantity -= data.quantity;
  }
  await product.save();
  return Response.json(txn);
}
