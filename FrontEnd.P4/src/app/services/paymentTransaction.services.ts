import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { PaymentTransactionRequest, PaymentTransactionResponse } from "../interfaces/paymentTransaction.dto";

@Injectable({
  providedIn: 'root'
})
export class paymentTransactionService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/paymentTransaction`;

    getAllPaymentTransaction(): Observable<PaymentTransactionResponse[]> {
            return this.http.get<PaymentTransactionResponse[]>(this.apiUrl);
    }

    getAllPaymentTransactionById(id: number): Observable<PaymentTransactionResponse> {
                return this.http.get<PaymentTransactionResponse>(`${this.apiUrl}/${id}`);
    }
    createPaymentTransaction(request: PaymentTransactionRequest): Observable<PaymentTransactionResponse>{
                return this.http.post<PaymentTransactionResponse>(this.apiUrl, request);
    }
    updatePaymentTransaction(id: number, request: PaymentTransactionRequest): Observable<PaymentTransactionResponse>{
        return this.http.put<PaymentTransactionResponse>(`${this.apiUrl}/${id}`, request);
    }
    deletePaymentTransaction(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}