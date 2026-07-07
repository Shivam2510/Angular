import { Routes } from "@angular/router";
import { canActivateChildGuard } from "./guard/can-activate-child-guard";


export const canActivateChildRoutes:Routes = [
    {
        path: '',
        canActivateChild: [canActivateChildGuard],
        loadComponent: () => import("./admin/admin").then(m => m.Admin),

         children: [

            {
                path: 'dashboard',
                loadComponent: () =>
                import('./dashboard/dashboard')
                    .then(m => m.Dashboard)
            },

            {
                path: 'users',
                loadComponent: () =>
                import('./users/users')
                    .then(m => m.Users)
            },

            {
                path: 'settings',
                loadComponent: () =>
                import('./settings/settings')
                    .then(m => m.Settings)
            }

        ]
    }
]