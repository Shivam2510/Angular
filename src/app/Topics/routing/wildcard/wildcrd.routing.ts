import { Routes } from "@angular/router";


export const wildcardRoutes: Routes = [
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
    path: 'about',

    loadComponent: () =>
      import('./components/about/about')
        .then(m => m.About)
  },

  {
    path: 'contact',

    loadComponent: () =>
      import('./components/contact/contact')
        .then(m => m.Contact)
  },

  {
    path: '**',

    loadComponent: () =>
      import('./components/not-found/not-found')
        .then(m => m.NotFound)
  }
]