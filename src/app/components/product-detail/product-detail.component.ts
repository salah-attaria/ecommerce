import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { fromEvent } from 'rxjs';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  data: any;
  id:any;
  count: number = 0;
  alert: boolean = false;
  untouched: boolean = true;
  quantity!: any;
  description!: string;
  constructor(
    private connect: ConnectionService,
    private route: ActivatedRoute,
    public router: Router,
    private jwt: JwtHelperService,
    private fb: FormBuilder
  ) {}
  @ViewChild('input') input!: ElementRef;
  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwt.decodeToken(token);
       this.id = decodedToken.id;
      console.log(this.id);
    } else {
      console.error('Token not found');
    }
    this.route.params.subscribe((params: any) => {
      params['id'];
      console.log(params);
      this.connect.getDataById(params['id']).subscribe((resp) => {
        console.log(resp);
        this.data = resp;
        let price = this.data.price;
        let name = this.data.name;
        this.description = this.data[0].description;
        let quantity = this.input.nativeElement.value;
        let image=this.data.image
        console.log(quantity + price + name);
      });
    });
  }

  add() {
    this.alert = false;
    this.count++;
  }
  remove() {
    if (this.count > 0) {
      this.count--;
    }
    this.alert = false;
  }

  ngAfterViewInit(): void {
    this.addToCart();
    
  }
  // getUserId() {
  //   let token: any = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = this.jwt.decodeToken(token);
  //     const userId = decodedToken.id;
  //     console.log(userId);
  //   } else {
  //     console.error('Token not found');
  //   }
  // }
  addToCart() {
    this.quantity = this.input.nativeElement.value;
    console.log(this.quantity);
    if (!isNaN(parseInt(this.quantity)) && parseInt(this.quantity) <= 0) {
      this.alert = true;
    } else {
      this.alert = false;
      this.untouched = false;
      const orderData = {
        name: this.data[0].name,
        quantity: parseInt(this.quantity),
        price: this.data[0].price,
        userId: this.id,
        description: this.data[0].description,
      };
      // console.log(orderData);
      this.connect.postCartData(orderData).subscribe((res) => {
        console.log(orderData);
        this.input.nativeElement.value=0
      });
    }
  }
}
