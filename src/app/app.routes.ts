import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './service/auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
    {
        path: '', redirectTo:'login' , pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'user-profile',
                component: UserProfileComponent,
                canActivate: [authGuard]
            }
        ]
    }
];
