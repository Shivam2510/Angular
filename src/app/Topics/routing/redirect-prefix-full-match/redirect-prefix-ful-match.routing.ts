import { Routes } from "@angular/router";


export const redirectPrifixAndFullMatch: Routes = [
    {
    path: '',

    redirectTo: 'home',

    pathMatch: 'full'
  },

  {
    path: 'home',

    loadComponent: () =>
      import('./components/home/home')
        .then(m => m.Home)
  },

  {
    path: 'login',

    loadComponent: () =>
      import('./components/login/login')
        .then(m => m.Login)
  },

  {
    path: 'dashboard',

    loadComponent: () =>
      import('./components/dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'old-dashboard',

    redirectTo: 'dashboard',

    pathMatch: 'full'
},
{
    path: 'admin',
    redirectTo: 'login',
    pathMatch: 'prefix'
},
]