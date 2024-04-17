import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderDialogeComponent } from '../order-dialoge/order-dialoge.component';
import { ConnectionService } from '../../../services/connection.service';
import { map, of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  data: any;
  item: any;
  itemId: any;
  description: any;
  checkoutForm: FormGroup = this.fb.group({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    payment: new FormControl(''),
    creditName: new FormControl(''),
    creditCardNumber: new FormControl(''),
  });
  id: any;
  message:boolean=false;
  errorMsg:boolean=false;
  constructor(
    public router:Router,
    public dialog: MatDialog,
    private connect: ConnectionService,
    private fb: FormBuilder,
    private jwt:JwtHelperService,
    private snack:SnackbarService
  ) {}
  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      this.id = decodedToken.id;
      console.log(this.id);
    } else {
      console.error('Token not found');
    }
    // console.log(userId)
    this.connect.getcartDataById(this.id).subscribe((resp: any) => {
      this.data = resp.map((item: any) => {
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        };
      });
      if (Array.isArray(this.data) && this.data.length > 0) {
        const total = this.data.reduce((total: number, currentItem: any) => {
          return total + this.item.total;
        }, 0);
      }
    });
  }
  getTotalPrice(): number {
    return this.data.reduce((total: any, item: any) => total + item.total, 0);
  }
  placeOrder() {
    let data = this.checkoutForm.value;
    if(this.checkoutForm.valid){
      const dialogRef = this.dialog.open(OrderDialogeComponent, {
        height: '300px',
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((resp) => {
        if (resp == 'ok') {
          // let data =this.checkoutForm.value
          this.connect.postBillingData(data).subscribe((resp: any) => {
            console.log('billing details added' + resp);
            let userId=this.id;
            this.connect.deleteCartItem(userId).subscribe({
              next: () => {
                console.log('Cart cleared successfully');
                // this.message=true;
                this.snack.openSnackBar('Order Has Been Placed','Info')
                setTimeout(() => {
                  this.router.navigateByUrl('/home')
                }, 3000);
               
               
                
              },
              error: (error) => {
                console.log(error);
              },
            });
          });
          console.log(data);
          // alert('order placed');
        } else {
          alert('order has been cancelled');

        }
      });
    }else{
      console.log('invalid')
      this.snack.openSnackBar('Please Enter The Required Fields','Warning')
      // this.errorMsg=true;


    }

    // this.connect.postBillingData(data).subscribe((resp:any)=>{
    //   console.log(resp)
    // })
    // console.log(data)
   
  }
}
