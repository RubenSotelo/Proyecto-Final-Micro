import { Routes } from '@angular/router';
/// Importamos los compones a utilizar
import { LoginComponent } from '../components/user/login/login.component';
import { RegistroComponent } from '../components/user/registro/registro.component';
import { TablaComponent } from '../components/user/tabla/tabla.component';
import { UserComponent } from '../components/user/user/user.component';

export const ROUTES_USER: Routes = [

    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'tabla', component: TablaComponent},
    {path: 'user', component: UserComponent},
    {path: 'actualizar', component: UserComponent}
];

