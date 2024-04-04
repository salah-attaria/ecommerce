import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  tokenSubject: Subject<void> = new Subject<void>();
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
    this.tokenSubject.next();
  }
  getToken(){
    localStorage.getItem('token')  || '';
  }
}
