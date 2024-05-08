import { Routes } from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';
import { LoginComponent } from '../components/user/login/login.component';


export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {   path: 'user',
        loadChildren: () => import('./user.routes').then(m => m.ROUTES_USER)
    },
    { path: '**', component: ErrorComponent }
];
