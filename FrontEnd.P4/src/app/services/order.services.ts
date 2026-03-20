import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { OrderRequest, OrderResponse } from "../interfaces/order.dto";

@Injectable({
  providedIn: 'root'
})
export class OrderService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/order`;

    getAllOrders(): Observable<OrderResponse[]> {
            return this.http.get<OrderResponse[]>(this.apiUrl);
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
}