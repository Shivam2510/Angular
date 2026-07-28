import { Routes } from "@angular/router";
import { authGuardTsGuard } from "./guards/auth.guard.ts-guard";

export const canActivateGuard:Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home').then(m => m.Home)
    },

    {
        path: 'dashboard',
        canActivate: [authGuardTsGuard],
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
    }
]