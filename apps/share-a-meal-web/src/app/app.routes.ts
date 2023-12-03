/* eslint-disable @nx/enforce-module-boundaries */
import { Route } from '@angular/router';
import { 
        AboutPageComponent, 
         
    } from '@avans-nx-workshop/share-a-meal/features';
import { CircuitDetailsComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-details/circuit-details.component';
import { CircuitEditComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-edit/circuit-edit.component';
import { CircuitListComponent } from 'libs/share-a-meal/features/src/lib/circuit/circuit-list/circuit-list.component';
import { UserDetailsComponent } from 'libs/share-a-meal/features/src/lib/user/user-details/user-details.component';
import { UserEditComponent } from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';
import { UserListComponent } from '@avans-nx-workshop/share-a-meal/features';
import { TeamListComponent } from 'libs/share-a-meal/features/src/lib/team/team-list/team-list.component';
import { TeamDetailsComponent } from 'libs/share-a-meal/features/src/lib/team/team-details/team-details.component';
import { TeamEditComponent } from 'libs/share-a-meal/features/src/lib/team/team-edit/team-edit.component';
import { DriverListComponent } from 'libs/share-a-meal/features/src/lib/driver/driver-list/driver-list.component';
import { DriverEditComponent } from 'libs/share-a-meal/features/src/lib/driver/driver-edit/driver-edit.component';
import { DriverDetailsComponent } from 'libs/share-a-meal/features/src/lib/driver/driver-details/driver-details.component';

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
        path: 'team',
        pathMatch: 'full',
        component: TeamListComponent
    },
    {
        path: 'team/new',
        pathMatch: 'full',
        component: TeamEditComponent
    },
    {
        path: 'team/:id',
        pathMatch: 'full',
        component: TeamDetailsComponent
    },

    {
        path: 'team/:id/edit',
        pathMatch: 'full',
        component: TeamEditComponent
    },
    {
        path: 'driver',
        pathMatch: 'full',
        component: DriverListComponent
    },
    {
        path: 'driver/new',
        pathMatch: 'full',
        component: DriverEditComponent
    },
    {
        path: 'driver/:id',
        pathMatch: 'full',
        component: DriverDetailsComponent
    },

    {
        path: 'driver/:id/edit',
        pathMatch: 'full',
        component: DriverEditComponent
    },
    {
        path:'**',
        redirectTo:'dashboard'
    }
];
