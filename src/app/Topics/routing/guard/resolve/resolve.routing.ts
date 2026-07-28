import { Routes } from "@angular/router";
import { userResolver } from "./resolve/user-resolver";


export const resolveRoutes: Routes = [
    {
        path:"",
        loadComponent: () => import("./components/user-list/user-list").then(m => m.UserList)
    },
    {
        path: "user/:id",
        resolve: {
            'user': userResolver
        },
        loadComponent: ()=> import("./components/user-details/user-details").then(m => m.UserDetails)
    }
]