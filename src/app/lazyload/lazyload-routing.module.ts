import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';
import { verificationGuard } from '../guards/verification.guard';
import { AccountPasswordComponent } from './components/account-password/account-password.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [authGuard, verificationGuard],
    children: [
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
        data: ['admin', 'user'],
      },
      {
        component: AccountPasswordComponent,
        canActivate: [authGuard, verificationGuard],

        path: 'change_password',
        data: ['admin', 'user'],
      },
      
      {
        component: CartComponent,
        canActivate: [authGuard, verificationGuard],

        path: 'cart/:userId',
        data: ['admin', 'user'],
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
      },{ path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyloadRoutingModule {}
