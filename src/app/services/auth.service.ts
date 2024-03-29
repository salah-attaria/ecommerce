import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
url="http://localhost:4800/"
  logout(){
    localStorage.removeItem('token');
  }
  login(body:any){
    return this.http.post(this.url+'login',body);
  }
  // loginToken(){
  //   if()
  //   localStorage.setItem('user',)
  // }
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    localStorage.getItem('token')  || '';
  }
}
