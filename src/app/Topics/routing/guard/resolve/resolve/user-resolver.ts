import { ResolveFn } from '@angular/router';
import { User } from '../service/user';
import { inject } from '@angular/core';
import { user } from '../interface/user.interface';

export const userResolver: ResolveFn<user | undefined> = (route, state) => {

  const userService = inject(User);
  const id = Number(route.paramMap.get('id'));

  return userService.getUser(id)
};
