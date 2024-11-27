import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent),
        
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
        loadComponent: () => import('./component/home/home.component').then((m) => m.HomeComponent),
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions',
        loadComponent: () => import('./component/transaction/transaction.component').then((m) => m.TransactionComponent),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        loadComponent: () => import('./component/login/login.component').then((m) => m.LoginComponent)
    }
];
