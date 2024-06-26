import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { VerifyPasswordResponse } from '../lazyload/components/account-password/verify_password';
import { verifyTokenResponse } from '../components/reset-password/verify-token';
import { verifyEmailResponse } from '../components/forget-password/verify_email';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  url = 'http://localhost:4800/';

  constructor(private http: HttpClient) {}
 selectedlang=new BehaviorSubject('en')
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
  forget_password(body:any){
    return this.http.post<verifyEmailResponse>(this.url+'forget_password',body)
  }
  Verify_token(token:any){
    return this.http.get<verifyTokenResponse>(this.url+'verify_token/'+token)
  }
  reset_password(body:any){
    return this.http.post(this.url+'verify_token',body)
  }
  uploadVideo(body:any){
    return this.http.post(this.url+'uploadVideo',body)
  }
  getVideo(id:any){
    return this.http.get(this.url+'uploadVideo/'+id)
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


