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

  get(id: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${baseUrl}/${id}`);
  }

  create(data: ProductDetails): Observable<ProductDetails> {
    return this.http.post<ProductDetails>(baseUrl, data);
  }

  update(id: string, data: ProductDetails): Observable<ProductDetails> {
    return this.http.put<ProductDetails>(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<ProductDetails> {
    return this.http.delete<ProductDetails>(`${baseUrl}/${id}`);
  }

  findByTitle(title: string): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${baseUrl}/productName?productName=${title}`);
  }
  getCategories(): Observable<ProductDetails[]> {
    return this.http.get<ProductDetails[]>(`${baseUrl}/category`);
  }
}