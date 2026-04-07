import { OrderItemResponse } from "./orderItem.dto";

export interface OrderRequest {
  orderId: number;
  userId: number;
  orderNumber: string;
  status: string;
  subtotal: number;
  total: number;
  createdAt: string;
}

export interface OrderResponse {
  orderId: number;
  userId: number;
  orderNumber: string;
  status: string;
  subtotal: number;
  total: number;
  createdAt: string;
  items: OrderItemResponse[];
}