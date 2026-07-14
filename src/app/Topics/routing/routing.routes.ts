import { Routes } from "@angular/router";


export const routingDemoRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./routing').then(m => m.Routing)
    },

    {
        path:'params-id',
        loadChildren: () => import('./params/params.routing').then(m => m.paramRouting)
    },

    {
        path: 'query-param',
        loadChildren: () => import('./query-params/query-param.routing').then(m => m.QueryParamRouting)
    },
    {
        path: 'can-activate',
        loadChildren: () => import('./guard/canactivated-guard/canactivate-guard.route').then(m => m.canActivateGuard)
    },
    {
        path: 'can-deactivate',
        loadChildren: () => import("./guard/candeactivate-guard/canDeactivate.routing").then(m => m.canDeactivateRoutes)
    },
    {
        path: 'can-activate-child',
        loadChildren: () => import("./guard/canactivate-child/canactivate-child.routing").then(m => m.canActivateChildRoutes)
    },
    {
        path: 'can-match',
        loadChildren: () => import("./guard/can-match/can-match.routes").then(m => m.canMatchRoutes)
    },
    {
        path: 'resolve',
        loadChildren: () => import("./guard/resolve/resolve.routing").then(m => m.resolveRoutes)
    },
    {
        path: 'redirect-prefix-full-match',
        loadChildren: () => import("./redirect-prefix-full-match/redirect-prefix-ful-match.routing").then(m => m.redirectPrifixAndFullMatch)
    },
    {
        path: 'wildcard',
        loadChildren: () => import("./wildcard/wildcrd.routing").then(m => m.wildcardRoutes)
    },
    {
        path: 'routerLinkActive',
        loadChildren: () => import("./router-like-active/routerLinkActive.routing").then(m => m.routerLinkActiveRoutes)
    },
]