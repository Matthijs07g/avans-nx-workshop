/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { 
        AboutPageComponent, 
        MealListComponent 
    } from '@avans-nx-workshop/share-a-meal/features';
import { CircuitDetailsComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-details/circuit-details.component';
import { CircuitEditComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-edit/circuit-edit.component';
import { CircuitListComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-list/circuit-list.component';
import { UserDetailsComponent } from 'libs/share-a-meal/features/src/lib/user/user-details/user-details.component';
import { UserEditComponent } from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';
import { UserListComponent } from '@avans-nx-workshop/share-a-meal/features';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: AboutPageComponent
    },
    {
        path: 'about',
        pathMatch: 'full',
        component: AboutPageComponent
    },
    {
        path: 'user',
        pathMatch: 'full',
        component: UserListComponent
    },
    {
        path: 'user/new',
        pathMatch: 'full',
        component: UserEditComponent
    },
    {
        path: 'user/:id',
        pathMatch: 'full',
        component: UserDetailsComponent
    },
    {
        path: 'user/:id/edit',
        pathMatch: 'full',
        component: UserEditComponent
    },
    {
        path: 'circuit',
        pathMatch: 'full',
        component: CircuitListComponent,
    },
    {
        path: 'circuit/new',
        pathMatch: 'full',
        component: CircuitEditComponent
    },
    {
        path: 'circuit/:id',
        pathMatch: 'full',
        component: CircuitDetailsComponent
    },
    {
        path: 'circuit/:id/edit',
        pathMatch: 'full',
        component: CircuitEditComponent
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
