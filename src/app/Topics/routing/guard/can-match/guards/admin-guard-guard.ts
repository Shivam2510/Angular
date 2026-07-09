import { CanActivateFn, CanMatch, CanMatchFn } from '@angular/router';
import { Role } from '../service/role';
import { inject } from '@angular/core';

export const adminGuardGuard: CanMatchFn = () => {

  const  role = inject(Role);

  return role.role() === "admin";
};
