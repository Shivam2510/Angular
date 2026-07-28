import { Routes } from "@angular/router";

export const routerLinkActiveRoutes:Routes = [
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
    path: 'users',

    loadComponent: () =>
      import('./components/users/users')
        .then(m => m.Users)
  },

  {
    path: 'about',

    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  },

  {
    path: 'home/home-child',
    loadComponent: () => import('./components/home-child/home-child').then(m => m.HomeChild)
  }
]