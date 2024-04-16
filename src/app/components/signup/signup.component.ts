import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { toArray } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [
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
    role: new FormControl('', Validators.required),
  });
  error: boolean = false;
  register: boolean = false;
  role: any;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public route: Router,
    private snack:SnackbarService
  ) {}
  ngOnInit(): void {}
  signUp() {
    this.role = document.getElementById('input');
    // console.log(this.role.getAttribute('value'))
    this.role = this.role.getAttribute('value');
    console.log(this.role);
    this.signupForm.controls['role'].setValue(this.role);
    const data = this.signupForm.value;

    console.log(data);
    if (this.signupForm.valid) {
      if (data.password !== data.confirm_password) {
        this.signupForm.controls['confirm_password'].setErrors({
          mismatch: true,
        });
        this.snack.openSnackBar('Both fields of password should be matched','Warning')
      } else {
        this.connect.postSignUpData(data).subscribe({
          next: () => {
            console.log('successfully');
            // this.register = true;
            this.snack.openSnackBar('User Registered successfully','Success')

            setTimeout(() => {
              this.route.navigateByUrl('/');
            }, 3000);
          },
          error: (error) => {
            console.log(error);
            this.error = true;
          },
        });
      }
    } else {
      console.log(console.error());
    }
  }
 
}
