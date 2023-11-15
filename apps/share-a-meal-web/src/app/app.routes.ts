import { Route } from '@angular/router';
import { 
        AboutPageComponent, 
        MealListComponent 
    } from '@avans-nx-workshop/share-a-meal/features';
import { UserDetailsComponent } from 'libs/share-a-meal/features/src/lib/user/user-details/user-details.component';
import { UserEditComponent } from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';
import { UserListComponent } from 'libs/share-a-meal/features/src/lib/user/user-list/user-list.component';

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
        path:'**',
        redirectTo:'dashboard'
    }
];
