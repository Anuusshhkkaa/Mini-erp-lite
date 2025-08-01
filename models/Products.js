import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
