import mongoose, { Schema, Document } from 'mongoose';

/**
 * Product Interface
 */
export interface IProduct extends Document {
    name: string;
    description: string;
    category: string;
    price: number;
    discountPrice?: number;
    currency: string;
    sku: string;
    stock: number;
    images: string[];
    specifications?: Map<string, any>;
    tags: string[];
    brand?: string;
    rating: {
        average: number;
        count: number;
    };
    isActive: boolean;
    isFeatured: boolean;
    seller: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Product Schema
 */
const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minlength: [3, 'Product name must be at least 3 characters'],
            maxlength: [200, 'Product name cannot exceed 200 characters'],
            index: true
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters'],
            maxlength: [5000, 'Description cannot exceed 5000 characters']
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            trim: true,
            index: true
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative']
        },
        discountPrice: {
            type: Number,
            min: [0, 'Discount price cannot be negative'],
            validate: {
                validator: function(this: IProduct, value: number) {
                    // Discount price should be less than regular price
                    return !value || value < this.price;
                },
                message: 'Discount price must be less than regular price'
            }
        },
        currency: {
            type: String,
            required: [true, 'Currency is required'],
            default: 'USD',
            uppercase: true,
            enum: {
                values: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'],
                message: 'Currency must be a valid currency code'
            }
        },
        sku: {
            type: String,
            required: [true, 'SKU is required'],
            unique: true,
            trim: true,
            uppercase: true,
            index: true
        },
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0
        },
        images: {
            type: [String],
            validate: {
                validator: function(images: string[]) {
                    return images.length > 0;
                },
                message: 'At least one product image is required'
            }
        },
        specifications: {
            type: Map,
            of: Schema.Types.Mixed,
            default: new Map()
        },
        tags: {
            type: [String],
            default: [],
            index: true
        },
        brand: {
            type: String,
            trim: true,
            index: true
        },
        rating: {
            average: {
                type: Number,
                min: [0, 'Rating cannot be less than 0'],
                max: [5, 'Rating cannot be more than 5'],
                default: 0
            },
            count: {
                type: Number,
                min: [0, 'Rating count cannot be negative'],
                default: 0
            }
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        isFeatured: {
            type: Boolean,
            default: false,
            index: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Seller is required'],
            index: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ 'rating.average': -1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ seller: 1, isActive: 1 });

// Virtual property for discount percentage
ProductSchema.virtual('discountPercentage').get(function(this: IProduct) {
    if (!this.discountPrice || this.discountPrice >= this.price) return 0;
    return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

// Virtual property for in stock status
ProductSchema.virtual('inStock').get(function(this: IProduct) {
    return this.stock > 0;
});

// Virtual property for final price
ProductSchema.virtual('finalPrice').get(function(this: IProduct) {
    return this.discountPrice && this.discountPrice < this.price 
        ? this.discountPrice 
        : this.price;
});

// Ensure virtuals are included in JSON output
ProductSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        return ret;
    }
});

ProductSchema.set('toObject', {
    virtuals: true
});

export default ProductSchema;

