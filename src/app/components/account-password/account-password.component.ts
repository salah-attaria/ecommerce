import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
 
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VerifyPasswordResponse } from './verify_password';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.component.html',
  styleUrls: ['./account-password.component.css'],
})
export class AccountPasswordComponent {
  Verify_password_Form: FormGroup = this.fb.group({
    current_password: new FormControl('', Validators.required),
    id: new FormControl(null, Validators.required),
  });
  change_password_form: FormGroup = this.fb.group({
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    id: new FormControl(null, Validators.required),
  });

  response: any;
  error = false;
  private tokenSubscription!: Subscription;
  id: any;
  nextStep: boolean = false;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public router: Router,
    private jwt: JwtHelperService,
    private snack: SnackbarService
  ) {}
  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const decodedToken = this.jwt.decodeToken(token);
    this.id = decodedToken.id;
    console.log(this.id);
    // this.router.navigateByUrl('/home')
  }

  verify_password() {
    this.Verify_password_Form.controls['id'].setValue(this.id);
    let data = this.Verify_password_Form.value;
    console.log(data);
    this.connect.verify_Password(data).subscribe(
      (resp: VerifyPasswordResponse) => {
        console.log(resp);
        if (resp.password_Verified === true) {
          this.nextStep = true;
          this.changePassword();
          console.log('Password verified successfully');
        } else {
          // Password verification failed

          console.log('Password verification failed');
        }
      },
      (error: any) => {
        this.snack.openSnackBar('Something went wrong', 'Warning');

        console.error('Error:', error);
        // Handle error
      }
    );
  }

  changePassword() {
    this.change_password_form.controls['id'].setValue(this.id);
    let data = this.change_password_form.value;
    console.log(data);
    if (this.change_password_form.valid) {
      if (data.new_password !== data.confirm_password) {
        this.change_password_form.controls['confirm_password'].setErrors({
          mismatch: true,
        });
      } else {
        this.connect.changePassword(data).subscribe((resp: any) => {
          console.log(resp);
          this.snack.openSnackBar('Password has been changed', 'Info');
        });
        setTimeout(() => {
        this.router.navigateByUrl('/getUsers')
          
        }, 2000);

      }
    } else {
      console.log('invalid');
      // this.snack.openSnackBar('Something went wrong', 'Warning');
    }
  }
}
