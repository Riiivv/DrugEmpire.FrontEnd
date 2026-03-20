import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { ProductCategoryRequest, ProductCategoryResponse } from "../interfaces/productCategory.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/productCategory`;

    getAllProductCategories(): Observable<ProductCategoryResponse[]> {
        return this.http.get<ProductCategoryResponse[]>(this.apiUrl);
    }

    getAllProductCategoriesById(id: number): Observable<ProductCategoryResponse> {
        return this.http.get<ProductCategoryResponse>(`${this.apiUrl}/${id}`);
    }
    createProductCategory(request: ProductCategoryRequest): Observable<ProductCategoryResponse>{
        return this.http.post<ProductCategoryResponse>(this.apiUrl, request);
    }
    updateProductCategory(id: number, request: ProductCategoryRequest): Observable<ProductCategoryResponse>{
        return this.http.put<ProductCategoryResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteProductCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}