import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TestComponent } from './test/test.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  { component: LoginComponent, path: '' },
  { component: TestComponent, path: 'test' },
  {
    path: 'lazy',
    loadChildren: () =>
      import('./lazyload/lazyload.module').then((m) => m.LazyloadModule),
  },
  {
    component: SignupComponent,

    path: 'create-account',
  },{
    component: ForgetPasswordComponent,
    // canActivate: [authGuard, verificationGuard],

    path: 'forget_password',
    // data: ['admin','user'],
  },
  { component: NotFoundComponent, path: '**' },
  {
    component: ResetPasswordComponent,

    path: 'reset_password/:token',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
