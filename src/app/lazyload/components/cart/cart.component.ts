import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  displayedColumns: string[] = [
    '_id',
    'name',
    'price',
    'quantity',
    'total_amount',
    'actions',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  userId!: string;
  id: any;
  data: any;
  message: boolean = false;
  total!: number;
  response: any[] = [];
  tokenRole: any;
  role: any;

  constructor(
    private connect: ConnectionService,
    private route: ActivatedRoute,
    private jwt: JwtHelperService,
    public router: Router,
    private snack: SnackbarService
  ) {}

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    console.log(token);

    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      this.id = decodedToken.id;
      // console.log('role' + this.role);
    } else {
      console.error('Token not found');
    }
    this.getCartData();
  }

  getCartData() {
    if (!this.id) {
      console.error('User ID not found');
      return;
    }

    this.connect.getcartDataById(this.id).subscribe((resp: any) => {
      if (resp && resp.length > 0) {
        this.dataSource.data = resp.map((item: any) => {
          return {
            _id: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total_amount: item.quantity * item.price,
          };
        });
      } else {
        this.snack.openSnackBar('Cart is empty', 'Info');
        setTimeout(() => {
          this.router.navigateByUrl('/lazy/home');
        }, 2000);
        // alert('cart is empty')
      }
    });
  }

  getTotalPrice(): number {
    return this.dataSource.data.reduce((total, item) => total + item.total_amount, 0);
  }

  deleteItem(id: any) {
    this.connect.deleteUselessItem(id).subscribe((resp: any) => {
      console.log(resp);
      this.refreshTable(this.id);
    });
  }

  refreshTable(id: any) {
    this.connect.getcartDataById(id).subscribe((resp: any) => {
      if(resp){
        this.dataSource.data = resp.map((item: any) => {
          return {
            _id: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total_amount: item.quantity * item.price,
          };
        });
      }
       
      if ( this.dataSource.data.length > 0) {

        this.snack.openSnackBar('Cart item has been deleted', 'Info');
      } else {
        this.snack.openSnackBar('Cart is empty', 'Info');
      }
    });
  }
}
