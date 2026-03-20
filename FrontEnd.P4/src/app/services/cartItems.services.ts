import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { CartItemRequest, CartItemResponse } from "../interfaces/cartItem.dto";

@Injectable({
  providedIn: 'root'
})
export class CartItemService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/cartitem`;

     getAllCartItems(): Observable<CartItemResponse[]> {
            return this.http.get<CartItemResponse[]>(this.apiUrl);
    }

    getCartItemsById(id: number): Observable<CartItemResponse> {
                return this.http.get<CartItemResponse>(`${this.apiUrl}/${id}`);
    }
    createCartItems(request: CartItemRequest): Observable<CartItemResponse>{
                return this.http.post<CartItemResponse>(this.apiUrl, request);
    }
    updateCartItems(id: number, request: CartItemRequest): Observable<CartItemResponse>{
        return this.http.put<CartItemResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteCartItems(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}