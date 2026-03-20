import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { ProductImageRequest, ProductImageResponse } from "../interfaces/produtImage.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductImageService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/productImage`;

    getAllProductImages(): Observable<ProductImageResponse[]> {
        return this.http.get<ProductImageResponse[]>(this.apiUrl);
    }

    getAllProductImagesById(id: number): Observable<ProductImageResponse> {
        return this.http.get<ProductImageResponse>(`${this.apiUrl}/${id}`);
    }
    createProductImage(request: ProductImageRequest): Observable<ProductImageResponse>{
        return this.http.post<ProductImageResponse>(this.apiUrl, request);
    }
    updateProductImage(id: number, request: ProductImageRequest): Observable<ProductImageResponse>{
        return this.http.put<ProductImageResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteProductImage(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}