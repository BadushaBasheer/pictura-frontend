import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    registerUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}register`, userData);
    }

    loginUser(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}login`, userData);
    }

}
