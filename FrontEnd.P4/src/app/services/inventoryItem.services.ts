import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { InventoryItemRequest, InventoryItemResponse } from "../interfaces/inventoryItem.dto";

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/invetoryitem`;

    getAllInventoryItems(): Observable<InventoryItemResponse[]> {
            return this.http.get<InventoryItemResponse[]>(this.apiUrl);
    }

    getInventoryItemById(id: number): Observable<InventoryItemResponse> {
                return this.http.get<InventoryItemResponse>(`${this.apiUrl}/${id}`);
    }
    createInventoryItem(request: InventoryItemRequest): Observable<InventoryItemResponse>{
                return this.http.post<InventoryItemResponse>(this.apiUrl, request);
    }
    updateInventoryItem(id: number, request: InventoryItemRequest): Observable<InventoryItemResponse>{
        return this.http.put<InventoryItemResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteInventoryItem(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}