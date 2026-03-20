import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { CartRequest, CartResponse } from "../interfaces/cart.dto";

@Injectable({
  providedIn: 'root'
})
export class CartService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/cart`;

     getAllCarts(): Observable<CartResponse[]> {
            return this.http.get<CartResponse[]>(this.apiUrl);
    }

    getCartById(id: number): Observable<CartResponse> {
                return this.http.get<CartResponse>(`${this.apiUrl}/${id}`);
    }
    createCart(request: CartRequest): Observable<CartResponse>{
                return this.http.post<CartResponse>(this.apiUrl, request);
    }
    updateCart(id: number, request: CartRequest): Observable<CartResponse>{
        return this.http.put<CartResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteCart(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}