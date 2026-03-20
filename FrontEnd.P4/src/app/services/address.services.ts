import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { AddressRequest, AddressResponse } from "../interfaces/address.dto";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/address`;

    getAllAddresses(): Observable<AddressResponse[]> {
        return this.http.get<AddressResponse[]>(this.apiUrl);
    }
    
    getAddressById(id: number): Observable<AddressResponse> {
        return this.http.get<AddressResponse>(`${this.apiUrl}/${id}`);
    }
    
    createAddress(request: AddressRequest): Observable<AddressResponse>{
        return this.http.post<AddressResponse>(this.apiUrl, request);
    }

    updateAddress(id: number, request: AddressRequest): Observable<AddressResponse>{
        return this.http.put<AddressResponse>(`${this.apiUrl}/${id}`, request);
    }

    deleteAddress(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    }
