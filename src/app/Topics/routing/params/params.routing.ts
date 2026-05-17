import { Routes } from "@angular/router";

export const paramRouting:Routes = [
     {
        path: '',
        loadComponent: () => import('./routing-user-list/routing-user-list').then(m => m.RoutingUserList)
    },

    {
        path: ':id',
        loadComponent: () => import('./routing-user-detail/routing-user-detail').then(m => m.RoutingUserDetail),
    }
]