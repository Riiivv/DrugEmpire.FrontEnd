import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { CategoryRequest, CategoryResponse } from "../interfaces/category.dto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/category`;

    getAllCategories(): Observable<CategoryResponse[]> {
            return this.http.get<CategoryResponse[]>(this.apiUrl);
    }

    getCategoryById(id: number): Observable<CategoryResponse> {
                return this.http.get<CategoryResponse>(`${this.apiUrl}/${id}`);
    }
    createCategory(request: CategoryRequest): Observable<CategoryResponse>{
                return this.http.post<CategoryResponse>(this.apiUrl, request);
    }
    updateCategory(id: number, request: CategoryRequest): Observable<CategoryResponse>{
        return this.http.put<CategoryResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}