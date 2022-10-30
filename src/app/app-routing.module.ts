import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FirstLogin } from './common/guards/first-login.guard';
import { IsLogged } from './common/guards/is-logged.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix',
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then((m) => m.AuthLayoutModule),
            },
        ],
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [FirstLogin, IsLogged],
        children: [
            {
                path: 'jobs',
                loadChildren: () => import('./pages/jobs/jobs.module').then((m) => m.JobsModule),
            },

            {
                path: 'user-profile',
                loadChildren: () => import('./pages/user-profile/user-profile.module').then((m) => m.UserProfileModule),
            },

            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
