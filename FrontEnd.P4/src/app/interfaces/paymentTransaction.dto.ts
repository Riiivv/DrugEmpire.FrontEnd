import { DecimalPipe } from "@angular/common";

export interface PaymentTransactionRequest{
paymentTransactionId: number;
orderId: number;
amount: DecimalPipe;
status: string;
provider: string;
providerReference: string;
createdAt: string;
}

export interface PaymentTransactionResponse{
paymentTransactionId: number;
orderId: number;
amount: DecimalPipe;
status: string;
provider: string;
providerReference: string;
createdAt: string;
}