import { Routes } from '@angular/router';
import { MainComponentComponent } from './main-component/main-component.component';
import { LoginComponent } from './authComponents/login/login.component';
import { RegisterComponent } from './authComponents/register/register.component';
import { DashboardComponent } from './dashboardComponents/dashboard/dashboard.component';
import { authGuard } from './tools/guards/auth.guard';
import { guestGuard } from './tools/guards/guest.guard';


export const routes: Routes = [
    { path: '', component: MainComponentComponent,
        children: [
            { path: 'login', canActivate: [guestGuard],component: LoginComponent },
            { path: 'register', canActivate: [guestGuard], component: RegisterComponent },
            { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent},
        ]
     },
    
    ]