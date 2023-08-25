import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // category
  addNewCategory(body: any, httpOptions: any) {
    return this.http.post(
      `${environment.apiUrl}category/add`,
      body,
      httpOptions
    );
  }
  getAllCategory() {
    return this.http.get(`${environment.apiUrl}category/get`);
  }
  updateCategory(body: any, httpOptions: any) {
    return this.http.put(
      `${environment.apiUrl}category/update`,
      body,
      httpOptions
    );
  }
  deleteCategory(id: any, httpOptions: any) {
    return this.http.delete(
      `${environment.apiUrl}category/delete/${id}`,
      httpOptions
    );
  }

  // brand
  addNewBrand(body: any, httpOptions: any) {
    return this.http.post(`${environment.apiUrl}brand/add`, body, httpOptions);
  }
  getAllBrand() {
    return this.http.get(`${environment.apiUrl}brand/get`);
  }
  updateBrand(body: any, httpOptions: any) {
    return this.http.put(
      `${environment.apiUrl}brand/update`,
      body,
      httpOptions
    );
  }
  deleteBrand(id: any, httpOptions: any) {
    return this.http.delete(
      `${environment.apiUrl}brand/delete/${id}`,
      httpOptions
    );
  }

  // product
  addNewProduct(body: any, httpOptions: any) {
    return this.http.post(
      `${environment.apiUrl}product/add`,
      body,
      httpOptions
    );
  }
  getAllProduct() {
    return this.http.get(`${environment.apiUrl}product/get`);
  }
  getProductById(id: number) {
    return this.http.get(`${environment.apiUrl}product/getById/${id}`);
  }
  getProductByCategory(id: number) {
    return this.http.get(`${environment.apiUrl}product/getByCategory/${id}`);
  }
  getProductByBrand(id: number) {
    return this.http.get(`${environment.apiUrl}product/getByBrand/${id}`);
  }
  updateProduct(body: any, httpOptions: any) {
    return this.http.put(
      `${environment.apiUrl}product/update`,
      body,
      httpOptions
    );
  }
  deleteProduct(id: number, httpOptions: any) {
    return this.http.delete(
      `${environment.apiUrl}product/delete/${id}`,
      httpOptions
    );
  }

  // image
  uploadImage(file: any, httpOptions: any) {
    const body = new FormData();
    body.append('file', file);

    return this.http.post(`${environment.apiUrl}image`, body, httpOptions);
  }
  deleteImage(id: number, httpOptions: any) {
    return this.http.delete(`${environment.apiUrl}image/${id}`, httpOptions);
  }

  // dashboard
  getCount() {
    return this.http.get(`${environment.apiUrl}dashboard/get`);
  }
}
