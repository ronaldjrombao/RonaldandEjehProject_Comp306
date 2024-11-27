import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./component/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./component/home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'transactions',
        loadComponent: () => import('./component/transaction/transaction.component').then((m) => m.TransactionComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent)
    }
];
