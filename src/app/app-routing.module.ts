import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestComponent } from './test/test.component';
import { authGuard } from './guards/auth.guard';
import { verificationGuard } from './guards/verification.guard';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AccountPasswordComponent } from './components/account-password/account-password.component';

const routes: Routes = [
  { component: LoginComponent, path: '' },
  { component: TestComponent, path: 'test' },
  {
    component: HomeComponent,
    canActivate: [authGuard, verificationGuard],
    path: 'home',
    data: ['admin', 'user'],
  },
  {
    component: ProductDetailComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'product/:id',
    data: ['admin', 'user'],
  },
  {
    component: CheckoutComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'checkout',
    data: ['admin','user'],
  },
  {
    component: AccountPasswordComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'change_password',
    data: ['admin','user'],
  },
  {
    component: CartComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'cart/:userId',
    data: ['admin','user'],
  },
  {
    component: GetUsersComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'getUsers',
    data: ['admin'],
  },
  {
    component: AllProductsComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'getProducts',
    data: ['admin'],
  },
  {
    component: UpdateUserComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'update/:id',
    data: ['admin'],
  },
  {
    component: UpdateProductComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'update-product/:id',
    data: ['admin'],
  },
  {
    component: AddProductComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'addProduct',
    data: ['admin'],
  },
  {
    component: AddAdminComponent,
    canActivate: [authGuard, verificationGuard],

    path: 'addAdmin',
    data: ['admin'],
  },
  {
    component: SignupComponent,
    // canActivate: [authGuard],

    path: 'create-account',
    // data: ['admin', 'user'],
  },
  { component: NotFoundComponent, path: '**' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
