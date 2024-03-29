import { CanActivateFn } from '@angular/router';

export const verificationGuard: CanActivateFn = (route, state) => {
  let token=localStorage.getItem('token');
  if(token){
    return true
  }else{
    return false;

  }
};
