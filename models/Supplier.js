import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: String,
  contact: String
});

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);
