import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { ShipmentRequest, ShipmentResponse } from "../interfaces/shipment.dto";

@Injectable({
  providedIn: 'root'
})
export class ShipmentService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/shipment`;

    getAllShipments(): Observable<ShipmentResponse[]> {
        return this.http.get<ShipmentResponse[]>(this.apiUrl);
    }

    getShipmentsById(id: number): Observable<ShipmentResponse> {
        return this.http.get<ShipmentResponse>(`${this.apiUrl}/${id}`);
    }
    createShipment(request: ShipmentRequest): Observable<ShipmentResponse>{
        return this.http.post<ShipmentResponse>(this.apiUrl, request);
    }
    updateShipment(id: number, request: ShipmentRequest): Observable<ShipmentResponse>{
        return this.http.put<ShipmentResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteShipment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}