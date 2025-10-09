import { CanMatchFn } from '@angular/router';

export const loginGuard: CanMatchFn = (route, segments) => {
  return true;
};
