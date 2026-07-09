import { Routes } from '@angular/router';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { userMatchGuard } from './guards/user-match-guard';
import { errorUserGuard } from './guards/error-user-guard';


export const canMatchRoutes: Routes = [

  {
    path: '',
    loadComponent: () => import("./can-match-home/can-match-home").then(m => m.CanMatchHome)
  },

  {
    path: 'dashboard',

    canMatch: [adminGuardGuard],

    loadComponent: () =>
      import('./admin-dashboard/admin-dashboard')
        .then(m => m.AdminDashboard)
  },

  {
    path: 'dashboard',

    canMatch: [userMatchGuard],

    loadComponent: () =>
      import('./user-dashboard/user-dashboard')
        .then(m => m.UserDashboard)
  },

  {
    path: 'dashboard',

    canMatch: [errorUserGuard],

    loadComponent: () => import("./error-user/error-user").then(m => m.ErrorUser)
  }

];