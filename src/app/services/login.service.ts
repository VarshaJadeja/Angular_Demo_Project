import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
const baseUrl = 'https://localhost:7065/api/products';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginRequest = { UserName: username, Password: password };

    return this.http.post<any>(`${baseUrl}/api/login`, loginRequest)
      .pipe(
        catchError(error => {
          throw error; // Handle errors globally or within the component
        })
      );
  }
}
