export interface ProductRequest {
  productId: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  isActive: boolean;
  categoryId: number;
}

export interface ProductResponse {
  productId: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  isActive: boolean;
  categoryId: number;
  categoryName: string;
}