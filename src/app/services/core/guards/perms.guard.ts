import { CanActivateFn } from '@angular/router';

export const permsGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('Token') === 'ADM') {
    return true;
  } else{
    return false;
  }
};
