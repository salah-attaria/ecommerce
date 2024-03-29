import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { toArray } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    role: new FormControl('',Validators.required),

  });
  error:boolean=false;
  register:boolean=false;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public route: Router
  ) {}
  ngOnInit(): void {}
  signUp() {
      const data = this.signupForm.value;
      console.log(data);
    if(this.signupForm.valid){
      this.connect.postSignUpData(data).subscribe({
        next: () => {
          console.log('successfully');
          this.register=true;
          
          setTimeout(()=>{
          this.route.navigateByUrl('/');

          },3000)
          // alert('Registered successfully');
        },
        error: (error) => {
          console.log(error);
          // alert('email is already taken ');
          this.error=true;
        },
      })
       
        
      
    }else{
      // alert('Please enter the required fields')
      console.log(console.error()
      )
    }
  }
      // let result=JSON.stringify(resp)
      // localStorage.setItem('user',result)
     
  }

