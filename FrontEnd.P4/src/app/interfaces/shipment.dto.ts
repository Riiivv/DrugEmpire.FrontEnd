export interface ShipmentRequest{
shipmentId: number;
orderId: number;
order: string;
carrier: string;
trackingNumber: string;
status: string;
shippedAt: string;
deliveredAt: string;
}

export interface ShipmentResponse{
shipmentId: number;
orderId: number;
carrier: string;
trackingNumber: string;
status: string;
shippedAt: string;
deliveredAt: string;
}