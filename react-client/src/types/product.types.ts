export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  _id: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product | Product[];
}


