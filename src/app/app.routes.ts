import { Routes } from '@angular/router';

export const routes: Routes = [

    // Direct components loding (lazy load)
    {
        path: '',
        loadComponent: () => import('./Topics/topics').then(m => m.Topics)
    },

    {
        path: 'reactive-forms',
        loadComponent: () => import('./Topics/reactive-forms/reactive-forms').then(m => m.ReactiveForms)
    },

    {
        path: 'form-array',
        loadComponent: () => import('./Topics/form-array-reactve-forms/form-array-reactve-forms').then(m => m.FormArrayReactveForms)
    },

    // load child or load full feature lazy loding
    {
        path: 'routing-demo',
        loadChildren: () => import('./Topics/routing/routing.routes').then(m => m.routingDemoRoutes)
    }
];
