import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { verifyEmailResponse } from './verify_email';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  forget_password_form: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  message: boolean = false;

  constructor(
    private fb: FormBuilder,
    private connect: ConnectionService,
    private snack: SnackbarService,
    // private router:Router
  ) {}
  ngOnInit(): void {}
  goBack(){
    window.history.back()
  }
  verify_email() {
    let data = this.forget_password_form.value;
    if (this.forget_password_form.valid) {
      this.connect.forget_password(data).subscribe(
        (resp: verifyEmailResponse) => {
          console.log(resp);
          if (resp.verify_email === true) {
            this.snack.openSnackBar(
              'Email Has Sent. Please Check Your Inbox to Reset Your Password',
              'Info'
            );
          } else{
            this.snack.openSnackBar(
              'Something Went Wrong. Please Check if The User exists',
              ''
            );
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
