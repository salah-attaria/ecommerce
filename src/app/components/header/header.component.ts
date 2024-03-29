import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ConnectionService } from 'src/app/services/connection.service';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
token: any;
show=false;
userId!: any;
role:any;
display: boolean=false;
access: boolean=false;;
constructor(private auth:AuthService,public router:Router,private jwt :JwtHelperService){}
ngOnInit(){
  let token: any = localStorage.getItem('token');
    if (token) {
      this.show=true;

      const decodedToken = this.jwt.decodeToken(token);
      this.userId = decodedToken.id;
      console.log(this.userId);

    } else {
      console.error('Token not found');
      // this.display=true;

    }
  // this.token=this.auth.getToken()!== null;
  // this.userId=localStorage.getItem('token')
    if(token){
      this.show=true;
    }else{
      console.log(';no token')
      this.display=true;
    }
    const decodedToken = this.jwt.decodeToken(token);
    this.role=decodedToken.role;
    // console.log('role'+role)
    if(this.role=='admin'){
      this.access==true;
    }
  
  
}
logout(){
  this.auth.logout();
  localStorage.removeItem('role')
  this.router.navigateByUrl('/');
  window.location.reload()
}
}
