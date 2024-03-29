import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from 'src/app/services/connection.service';
import { map, toArray } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

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
  elementData!: MatTableDataSource<any>;
  userId!: string;
  id: any;
  data: any;
  message: boolean = false;
  dataSource: any[] = [];
  total!: number;
  response: any[] = [];
  tokenRole: any;
  role: any;
  constructor(
    private connect: ConnectionService,
    private route: ActivatedRoute,
    private jwt: JwtHelperService,
    public router: Router
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
  getUserId() {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
      const userId = decodedToken.id;
      const role = decodedToken.role;
      // console.log(userId + role);
    } else {
      // console.error('Token not found');
    }
  }
  getrole() {
    let token: any = localStorage.getItem('token');
    const decodedToken: any = jwtDecode(token);
    const role: string = decodedToken.role;
    console.log('Role:', role);
  }
  getCartData() {
    if (!this.id) {
      console.error('User ID not found');
      return;
    }

    this.connect.getcartDataById(this.id).subscribe((resp: any) => {
      if (resp && resp.length > 0) {
        this.dataSource = resp.map((item: any) => {
          return {
            _id:item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          };
        });
        this.elementData = new MatTableDataSource(this.dataSource);
      } else {
        this.message = true;
        this.router.navigateByUrl('/home');
      }
    });
  }

  getTotalPrice(): number {
    return this.dataSource.reduce((total, item) => total + item.total, 0);
  }
  deleteItem(id:any) {
    // let name=this.dataSource['name']
    this.connect.deleteUselessItem(id).subscribe((resp:any)=>{
      console.log(resp)
 
        window.location.reload()
      
    })
  }
}
