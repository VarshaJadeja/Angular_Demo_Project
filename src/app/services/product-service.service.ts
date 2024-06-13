import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetails } from '../models/product.model';

const baseUrl = 'https://localhost:7065/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(baseUrl);
  }

  get(id: any): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  findByTitle(title: any): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${baseUrl}/productName?productName=${title}`);
  }
  getCategories(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${baseUrl}/category`);
  }
}