export interface ProductImageRequest{
productImageId: number;
productId: number;
product: string;
url: string;
sortOrder: number;
}

export interface ProductImageResponse{
productImageId: number;
productId: number;
url: string;
sortOrder: number;
}