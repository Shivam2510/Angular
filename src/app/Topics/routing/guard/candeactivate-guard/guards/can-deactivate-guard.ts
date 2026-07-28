import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { CanDeactivateComponent } from '../interface/can-deactivate.interface';

export const canDeactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (Component) => {
  return Component.canDeactivate();
};
