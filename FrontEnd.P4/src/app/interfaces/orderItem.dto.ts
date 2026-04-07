import { DecimalPipe } from "@angular/common";

export interface OrderItemRequest{
orderItemId: number;
orderId: number;
productId: number;
// price: DecimalPipe;
productNameSnapshot: string;
unitPriceSnapshot: DecimalPipe;
quantity: number;
}

export interface OrderItemResponse{
orderItemId: number;
orderId: number;
productId: number;
price: number;
productNameSnapshot: string;
unitPriceSnapshot: DecimalPipe;
quantity: number;
}