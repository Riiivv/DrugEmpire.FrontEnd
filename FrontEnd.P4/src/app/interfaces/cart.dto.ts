export interface CartRequest{
userId: number;
}

export interface CartResponse {
cartId: number;
userId: number;
createdAt: string;
updatedAt: string;
}