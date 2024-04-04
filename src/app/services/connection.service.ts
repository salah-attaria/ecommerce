import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { VerifyPasswordResponse } from '../components/account-password/verify_password';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  url = 'http://localhost:4800/';

  constructor(private http: HttpClient) {}
 
  getData() {
    return this.http.get(this.url + 'getData');
  }
  getDataById(id: any) {
    return this.http.get(this.url + 'getData/' + id);
  }
  postSignUpData(body: any) {
    return this.http.post(this.url + 'register', body);
  }
  postCartData(body: any) {
    return this.http.post(this.url + 'addOrder', body);
  }
  getcartDataById(id: string) {
    return this.http.get(this.url + 'cartData/' + id);
  }
  deleteCartItem(id: any) {
    return this.http.delete(this.url + 'deleteItems/' + id);
  }
  postBillingData(body: any) {
    return this.http.post(this.url + 'postBillingData', body);
  }
  getUsers() {
    return this.http.get(this.url + 'getUsers');
  }
  delUserById(id: any) {
    return this.http.delete(this.url + 'deltUser/' + id);
  }
  getUserById(id: any) {
    return this.http.get(this.url + 'getUserById/' + id);
  }
  updateData(body: any) {
    return this.http.put(this.url + 'updateData', body);
  }
  addProduct(body: any) {
    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = { headers: headers, reportProgress: true };
    return this.http.post(this.url + 'addProduct', body,options);
  }
  deltProductById(id: any) {
    return this.http.delete(this.url + 'deltProduct/' + id);
  }
  updateProductData(body: any) {
    return this.http.put(this.url + 'updateProductData', body);
  }
  deleteUselessItem(id:any){
    return this.http.delete(this.url + 'deleteUselessItem/' + id);

  }
  verify_Password(body:any){
    return this.http.post<VerifyPasswordResponse>(this.url+'verifyCurrentPassword',body)
  }
  changePassword(body:any):Observable<any>{
    return this.http.put(this.url+'change_Password', body)
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // You can also log the error here
    console.error(errorMessage);
    // Pass the error to the component
    return throwError(errorMessage);
  }
}


