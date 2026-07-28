import { Route, Routes } from "@angular/router";
import { canDeactivateGuard } from "./guards/can-deactivate-guard";

export const canDeactivateRoutes:Routes = [
    {
        path: '',
        loadComponent: () => import("./home/home").then(m => m.Home)
    },

    {
        path: 'edit-user',
        canDeactivate: [canDeactivateGuard],
        loadComponent: () => import("./user-edit/user-edit").then(m => m.UserEdit)
    }
]