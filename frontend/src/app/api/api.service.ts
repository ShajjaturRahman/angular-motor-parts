import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api_url = "http://localhost:1010"

  constructor(private http: HttpClient) { }

  getProductList(): Observable<any>{
    return this.http.get(`${this.api_url}/product/list`)
  }

  getProductById(payload: any): Observable<any>{
    return this.http.get(`${this.api_url}/product/${payload}`)
  }

  uploadImage(payload: any){
    const formData = new FormData()

    formData.append("product_img", payload)

    return this.http.post(`${this.api_url}/upload`, formData)
  }

  addProduct(payload: any){
    return this.http.post(`${this.api_url}/product/add`, payload)
  }

  updateProduct(payload: any){
    return this.http.patch(`${this.api_url}/product/update`, payload)
  }

  deleteProduct(id: any){
    return this.http.delete(`${this.api_url}/product/delete/${id}`)
  }

  registerAccount(payload: any){
    return this.http.post(`${this.api_url}/user/registration`, payload)
  }

  loginAccount(payload: any){
    return this.http.post(`${this.api_url}/user/login`, payload)
  }

  placeOrder(payload: any){
    return this.http.post(`${this.api_url}/order/place`, payload)
  }

  orderList(){
    return this.http.get(`${this.api_url}/order/list`)
  }
}
