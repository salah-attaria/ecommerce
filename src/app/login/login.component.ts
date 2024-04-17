import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
  response: any;
  error = false;
  private tokenSubscription!: Subscription;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public router: Router,
    private jwt: JwtHelperService,
    private snack: SnackbarService
  ) {}
  ngOnInit(): void {
    
    // this.router.navigateByUrl('/home')
  }

  login() {
    let data = this.loginForm.value;
    if (this.loginForm.valid) {
      console.log(data);
      this.auth.login(data).subscribe((resp: any) => {
        console.log(resp);
        // debugger;
        this.response = resp;
        if (this.response.accessToken) {
          this.auth.setToken(this.response.accessToken);
          this.router.navigateByUrl('/lazy/home');
          this.snack.openSnackBar('Welcom to the shop', 'Success');
        } else {
          
            this.snack.openSnackBar('Invalid credentials', 'Warning');
            this.router.navigateByUrl('/');
       
        }
      });
    } else {
      this.snack.openSnackBar('Invalid credentials', 'Warning');

    }
  }
  getUserId() {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      const userId = decodedToken.id;
      const role = decodedToken.role;
      console.log(userId + role);
    } else {
      console.error('Token not found');
    }
  }
 
}
