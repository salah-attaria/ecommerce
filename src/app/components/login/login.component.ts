import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),


  });
  response: any;
  error = false;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private jwt: JwtHelperService
  ) {}
  ngOnInit(): void {
    this.login();
    // this.router.navigateByUrl('/home')
  }

  login() {
    if (this.loginForm.valid) {
      let data = this.loginForm.value;
      console.log(data);
      this.auth.login(data).subscribe((resp: any) => {
        console.log(resp);
        // debugger;
        this.response = resp;
        if (this.response.accessToken) {
          this.auth.setToken(this.response.accessToken);
          this.router.navigateByUrl('/home');
          this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              window.location.reload();
            }
          });
          // this.router.navigateByUrl('/home');

          alert('welcome');
        } else {
          if (this.auth.getToken() == null) {
            this.error = true;
            this.router.navigateByUrl('/');
          } else {
            alert('Token expired.Again log in');
            this.router.navigateByUrl('/');
          }
        }
      });
    } else {
      alert('Invalid credentials');
    }

  }
  getUserId() {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      const userId = decodedToken.id;
      const role=decodedToken.role
      console.log(userId+role);
    } else {
      console.error('Token not found');
    }
  }
}
