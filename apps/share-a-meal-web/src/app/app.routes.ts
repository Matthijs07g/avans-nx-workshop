import { Route } from '@angular/router';
import { 
        AboutPageComponent, 
        MealListComponent 
    } from '@avans-nx-workshop/share-a-meal/features';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: MealListComponent
    },
    {
        path: 'about',
        pathMatch: 'full',
        component: AboutPageComponent
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
