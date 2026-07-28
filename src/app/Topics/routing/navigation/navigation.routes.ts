import { Routes } from "@angular/router";

export const navigationRoutes:Routes = [
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
            import('./components/user/user')
                .then(m => m.User)
    },

    {
        path: 'about',

        loadComponent: () =>
            import('./components/about/about')
                .then(m => m.About)
    }
]