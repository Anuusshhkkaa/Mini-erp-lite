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

  // Safely convert quantity to number
  const quantity = Number(data.quantity);

  // Create the transaction
  const txn = await Transaction.create({
    ...data,
    quantity,
  });

  const product = await Product.findById(data.productId);
  if (!product) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }

  // Adjust product quantity correctly
  if (data.type === 'purchase') {
    product.quantity += quantity;
  } else {
    product.quantity -= quantity;
  }

  await product.save();

  return Response.json(txn);
}
