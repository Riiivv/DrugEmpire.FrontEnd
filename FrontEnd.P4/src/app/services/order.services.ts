import { inject, Injectable, REQUEST } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { OrderRequest, OrderResponse } from "../interfaces/order.dto";

export interface CheckoutRequest {
  userId: number;
  cartId: number;
  shippingName: string;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingPhoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/order`;

    getAllOrders(): Observable<OrderResponse[]> {
            return this.http.get<OrderResponse[]>(this.apiUrl);
    }

    getOrdersByUserId(userId: number): Observable<OrderResponse[]> {
  return this.http.get<OrderResponse[]>(`${this.apiUrl}/user/${userId}`);
}
    getAllOrdersById(id: number): Observable<OrderResponse> {
                return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
    }
    createOrder(request: OrderRequest): Observable<OrderResponse>{
                return this.http.post<OrderResponse>(this.apiUrl, request);
    }
    updateOrder(id: number, request: OrderRequest): Observable<OrderResponse>{
        return this.http.put<OrderResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteOrder(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  checkout(request: CheckoutRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, request);
  }
}