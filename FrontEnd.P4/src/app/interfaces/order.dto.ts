import { DecimalPipe } from "@angular/common";

export interface OrderRequest{
orderId: number;
userId: number;
orderNumber: string;
status: string;
// subtotal: DecimalPipe;
// total: DecimalPipe;
createdAt: string; 
}
export interface OrderResponse{
orderId: number;
userId: number;
user: string;
orderNumber: string;
status: string;
// subtotal: DecimalPipe;
// total: DecimalPipe;
createdAt: string; 
}