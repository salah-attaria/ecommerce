import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { verifyTokenResponse } from './verify-token';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  verify_token: boolean = false;
  reset_password_form: FormGroup = this.fb.group({
    token: new FormControl(''),
    new_password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });
  token_value: any;

  constructor(
    private fb: FormBuilder,
    private connect: ConnectionService,
    private route: ActivatedRoute,
    private snack: SnackbarService,
    public router: Router
  ) {}
  ngOnInit(): void {
    let token = this.route.params.subscribe((params: any) => {
      params['token'];
      debugger;
      this.token_value = params['token'];
      console.log(this.token_value);

      this.connect
        .Verify_token(params['token'])
        .subscribe((resp: verifyTokenResponse) => {
          // console.log(resp)
          if (resp.token_verified === true) {
            this.snack.openSnackBar(
              'Invalid Token or Token expired',
              'Warning'
            );
          } else {
            this.snack.openSnackBar('token Verified', 'Success');
            this.verify_token = true;
          }
        });
      // console.log(params['token'])
    });
    // token=this.verify_token
    // console.log(token)
  }
  reset() {
    const data = this.reset_password_form.value;
    if ((this.verify_token = true)) {
      this.reset_password_form.controls['token'].setValue(this.token_value);
      const data = this.reset_password_form.value;
      console.log(data);
      if (this.reset_password_form.valid) {
        if (data.new_password !== data.confirm_password) {
          this.reset_password_form.controls['confirm_password'].setErrors({
            mismatch: true,
          });
          this.snack.openSnackBar(
            'Both fields of password should be matched',
            'Warning'
          );
        } else {
          this.connect.reset_password(data).subscribe((resp: any) => {
            console.log(resp);
            this.snack.openSnackBar('Password has been reset', 'Info');
            this.router.navigateByUrl('/');
          });
        }
      } else {
        console.log(console.error());
      }
      // console.log(data)
    } else {
      this.snack.openSnackBar('Token expires', '');
    }
  }
}
