import { Routes } from '@angular/router'; 
import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Auth-guard.service'

export const ROUTER: Routes = [
    
    { path: '', component: AcessoComponent },
    {path: 'home', component: HomeComponent, canActivate:[authGuard] }

] 