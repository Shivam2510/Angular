import { CanMatchFn } from '@angular/router';
import { Role } from '../service/role';
import { inject } from '@angular/core';

export const userMatchGuard: CanMatchFn = (route, segments) => {

  const role = inject(Role);
  return role.role() === "user";
};
