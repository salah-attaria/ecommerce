import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let roles=[];
  let length=2;
  // const location:Location=inject(Location)
  let token:any=localStorage.getItem('token')
  // let role=localStorage.getItem('role');
  
  debugger
  if(token){
    token=atob(token.split('.')[1])
    token=JSON.parse(token)
    for(let i=0;i<length; i++){
      if(route.data[i] != undefined){
        roles.push(route.data[i])
      }
    }
  }
  if(roles.includes(token.role)){
  return true;

  }else{
  // location.back()
    return false;

  }
};
