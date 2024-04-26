import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderDialogeComponent } from '../order-dialoge/order-dialoge.component';
import { ConnectionService } from '../../../services/connection.service';
import { map, of } from 'rxjs';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    address2: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
    creditName: new FormControl('', Validators.required),
    creditCardNumber: new FormControl('', Validators.required),
    product_quantity_price: new FormControl(''),
  });
  id: any;
  message: boolean = false;
  errorMsg: boolean = false;
  body: any;
  constructor(
    public router: Router,
    public dialog: MatDialog,
    private connect: ConnectionService,
    private fb: FormBuilder,
    private jwt: JwtHelperService,
    private snack: SnackbarService
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
      this.body = resp
        .map((item: any) => {
          return item.name + '_' + item.quantity + '_ $' + item.price;
        })
        .join(', ');
      if (Array.isArray(this.data) && this.data.length > 0) {
        const total = this.data.reduce((total: number, currentItem: any) => {
          return total + this.item.total;
        }, 0);
      } else {
        this.snack.openSnackBar(
          'Please add some products in your cart',
          'Warning'
        );
        setTimeout(() => {
          this.router.navigateByUrl('/lazy/home');
        }, 2000);
      }
    });
  }
  getTotalPrice(): number {
    return this.data.reduce((total: any, item: any) => total + item.total, 0);
  }
  placeOrder() {
    this.checkoutForm.controls['product_quantity_price'].setValue(this.body);
    let data = this.checkoutForm.value;

    console.log(data);

    if (this.checkoutForm.valid) {
      const dialogRef = this.dialog.open(OrderDialogeComponent, {
        height: '300px',
        width: '500px',
      });
      dialogRef.afterClosed().subscribe((resp) => {
        if (resp == 'ok') {
          this.connect.postBillingData(data).subscribe((resp: any) => {
            console.log('billing details added' + resp);
            let userId = this.id;
            this.connect.deleteCartItem(userId).subscribe({
              next: () => {
                console.log('Cart cleared successfully');
                this.snack.openSnackBar('Order Has Been Placed', 'Info');
                this.checkoutForm.reset();
                setTimeout(() => {
                  this.router.navigateByUrl('/lazy/home');
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
    } else {
      console.log('invalid');
      this.snack.openSnackBar('Please Enter The Required Fields', 'Warning');
    }
  }
}
