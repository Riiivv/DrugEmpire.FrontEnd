export interface CartItemRequest{
cartItemId: number;
cartId: number;
productId: number;
quantity: number;
}

export interface CartItemResponse{
  cartItemId: number;
  cartId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}