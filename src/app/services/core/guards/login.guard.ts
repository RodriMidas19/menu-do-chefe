import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('Token')=== null || localStorage.getItem('Token')=== undefined){
    return false;
  }
  else{
    return true;
  }
  
};
