import mongoose from 'mongoose';
import ProductSchema, { IProduct } from '../schemas/product.schema';

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
export { IProduct };

