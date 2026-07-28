import { CanMatchFn } from '@angular/router';
import { Role } from '../service/role';
import { inject } from '@angular/core';
import { delay, map, of } from 'rxjs';

export const errorUserGuard: CanMatchFn = (route, segments) => {

  const role = inject(Role);

  return of(role.role()).pipe(
    delay(5000),
    map((value) => value === "error")
  )
};
