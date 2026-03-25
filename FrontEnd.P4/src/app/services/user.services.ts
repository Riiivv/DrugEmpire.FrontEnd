import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { UserRequest, UserResponse } from "../interfaces/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService{
        private http = inject(HttpClient);
    private apiUrl = `${environment.apiBaseUrl}/api/user`;

    getAllUsers(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.apiUrl);
    }

    getUsersById(id: number): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
    }
    createUser(request: UserRequest): Observable<UserResponse>{
        return this.http.post<UserResponse>(this.apiUrl, request);
    }
    updateUser(id: number, request: UserRequest): Observable<UserResponse>{
        return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, request);
    }
    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}