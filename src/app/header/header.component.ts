import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ConnectionService } from 'src/app/services/connection.service';
import { NavigationEnd, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: any;
  show = false;
  userId!: any;
  role: any;
  display: boolean = false;
  access: boolean = false;
  constructor(
    private auth: AuthService,
    public router: Router,
    private jwt: JwtHelperService,
    private connect:ConnectionService
  ) {
   
  }
  ngOnInit() {
    this.refreshHeader();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshHeader();
      }
    });
  }

  refreshHeader() {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      this.userId = decodedToken.id;
      this.role = decodedToken.role;
      console.log(this.userId);

      if (this.role === 'admin') {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('role');
    this.router.navigateByUrl('/');
    this.role = null;
  }
 
}
