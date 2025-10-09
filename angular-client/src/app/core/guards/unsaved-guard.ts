import { CanDeactivateFn } from '@angular/router';

export const unsavedGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
