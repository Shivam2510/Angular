import { Routes } from "@angular/router";


export const routingDemoRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routing').then(m => m.Routing)
    },

    {
        path:'params-id',
        loadChildren: () => import('./params/params.routing').then(m => m.paramRouting)
    }
]