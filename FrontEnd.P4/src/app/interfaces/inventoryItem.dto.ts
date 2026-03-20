export interface InventoryItemRequest{
    inventoryItemId: number;
    productId: number;
    quantityOnHand: number;
    reservedQuantity: number;
    updatedAt: string;
}

export interface InventoryItemResponse{
inventoryItemId: number;
productId: number;
quantityOnHand: number;
reservedQuantity: number;
updatedAt: string;
}