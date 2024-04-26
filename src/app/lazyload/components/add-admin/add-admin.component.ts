import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  signupForm: FormGroup = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
      this.connect.postSignUpData(data).subscribe({
        next: () => {
          console.log('successfully');
          this.snack.openSnackBar('New Admin added successfully','Info')
          this.register = true;

          setTimeout(() => {
            this.route.navigateByUrl('/lazy/getUsers');
          }, 3000);
          // alert('Registered successfully');
        },
        error: (error) => {
          console.log(error);
          // alert('email is already taken ');
          this.error = true;
        },
      });
    } else {
      // alert('Please enter the required fields')
      this.snack.openSnackBar('Please enter the required fields','Warning')
      console.log(console.error());
    }
  }
  goBack(){
  window.history.back()
  }
  // let result=JSON.stringify(resp)
  // localStorage.setItem('user',result)

}
