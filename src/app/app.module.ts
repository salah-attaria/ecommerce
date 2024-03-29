import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { MatTableModule } from '@angular/material/table';
import { SignupComponent } from './components/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDialogeComponent } from './components/order-dialoge/order-dialoge.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { JwtModule } from '@auth0/angular-jwt';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AdminDeltDialogeComponent } from './components/admin-delt-dialoge/admin-delt-dialoge.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { DeltProductDialogComponent } from './components/delt-product-dialog/delt-product-dialog.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProductDetailComponent,
    CheckoutComponent,
    CartComponent,
    SignupComponent,
    OrderDialogeComponent,
    NotFoundComponent,
    TestComponent,
    GetUsersComponent,
    UsersDetailComponent,
    UpdateUserComponent,
    AdminDeltDialogeComponent,
    AddProductComponent,
    AllProductsComponent,
    DeltProductDialogComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
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
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: [
          'http://localhost:4800/addOrder',
          'http://localhost:4800/postBillingData',
        ], // adjust this based on your backend domain
        disallowedRoutes: [
          'http://localhost:4800/getData',
          'http://localhost:4800/register',
        ], // adjust this based on your backend paths
      },
    }),
    MatPaginatorModule,MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
