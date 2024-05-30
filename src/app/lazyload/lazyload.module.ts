import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyloadRoutingModule } from './lazyload-routing.module';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AdminDeltDialogeComponent } from './components/admin-delt-dialoge/admin-delt-dialoge.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DeltProductDialogComponent } from './components/delt-product-dialog/delt-product-dialog.component';
import { ForgetPasswordComponent } from '../components/forget-password/forget-password.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { HomeComponent } from './components/home/home.component';
import { OrderDialogeComponent } from './components/order-dialoge/order-dialoge.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSidenavModule} from '@angular/material/sidenav'
@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailComponent,
    CheckoutComponent,
    CartComponent,
    OrderDialogeComponent,
    GetUsersComponent,
    UsersDetailComponent,
    UpdateUserComponent,
    AdminDeltDialogeComponent,
    AddProductComponent,
    AllProductsComponent,
    DeltProductDialogComponent,
    UpdateProductComponent,
    AddAdminComponent,
    ForgetPasswordComponent,
    AccountPasswordComponent,
  ],
  imports: [
    CommonModule,
    LazyloadRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSortModule,MatSidenavModule,
  ],
})
export class LazyloadModule {}
