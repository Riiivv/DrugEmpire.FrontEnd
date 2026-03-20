import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { ProductRequest, ProductResponse } from "../interfaces/product.dto";
import { ProductCategoryRequest } from "../interfaces/productCategory.dto";
@Injectable({
  providedIn: 'root'
})
export class ProductService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/product`;

    getAllProducts(): Observable<ProductResponse[]> {
        return this.http.get<ProductResponse[]>(this.apiUrl);
    }

    getAllProductsById(id: number): Observable<ProductResponse> {
                return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
    }
    createProduct(request: ProductCategoryRequest): Observable<ProductResponse>{
                return this.http.post<ProductResponse>(this.apiUrl, request);
    }
    updateProduct(id: number, request: ProductRequest): Observable<ProductResponse>{
        return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}