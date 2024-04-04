import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  updateForm: FormGroup = this.fb.group({
    _id:new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });
  error: boolean = false;
  register: boolean = false;
  id:any;
  constructor(
    private connect: ConnectionService,
    private fb: FormBuilder,
    public route: Router,
    private router:ActivatedRoute,
    private snack:SnackbarService
  ) {}
  ngOnInit(): void {
    this.router.params.subscribe((params:any)=>{
      params['id']
      console.log(params['id'])
      this.id=params['id']
    })
    this.connect.getUserById(this.id).subscribe((resp:any)=>{
      console.log(resp);
      // this.updateForm= this.fb.group({
      //   firstName:resp.firstName,
      //   lastName:resp.lastName,
      //   email:resp.email,
      //   password:resp.password,
      //   role:resp.role,
      // });
      this.updateForm.patchValue(resp)
      
    })
  }
  update() {
    const data = this.updateForm.value;
    delete data.password;
    console.log(data);
    if (this.updateForm.valid) {
      this.connect.updateData(data).subscribe({
        next: () => {
          console.log('updated successfully');
        this.snack.openSnackBar('User updated','Info')
          setTimeout(() => {
            this.route.navigateByUrl('/getUsers');
          }, 3000);
        }
        ,
        error: (error: any) => {
          console.log(error);
          
        },
      }
      );
    } else {
      console.log(console.error());
      this.snack.openSnackBar('Something went wrong','Warning')

    }
  // }
  // updatePassword(){
// 
  // }
  }}
