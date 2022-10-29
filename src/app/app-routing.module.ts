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
                loadChildren: () =>
                    import('./layouts/auth-layout/auth-layout.module').then(
                        (m) => m.AuthLayoutModule,
                    ),
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
                loadChildren: () =>
                    import('./pages/jobs/jobs.module').then((m) => m.JobsModule),
            },
            {
                path: 'calendar-admin',
                loadChildren: () =>
                    import('./pages/calendar-admin/calendar-admin.module').then(
                        (m) => m.CalendarAdminModule,
                    ),
            },
            {
                path: 'calendar-view',
                loadChildren: () =>
                    import('./pages/calendar-view/calendar-view.module').then(
                        (m) => m.CalendarViewModule,
                    ),
            },
            {
                path: 'user-profile',
                loadChildren: () =>
                    import('./pages/user-profile/user-profile.module').then(
                        (m) => m.UserProfileModule,
                    ),
            },
            {
                path: 'manage-users',
                loadChildren: () =>
                    import(
                        './pages/settings/pages/manage-users/manage-users.module'
                    ).then((m) => m.ManageUsersModule),
            },
            {
                path: 'contacts',
                loadChildren: () =>
                    import('./pages/contacts/contacts.module').then(
                        (m) => m.ContactsModule,
                    ),
            },
            {
                path: 'schedule',
                loadChildren: () =>
                    import('./pages/settings/pages/schedule/schedule.module').then(
                        (m) => m.ScheduleModule,
                    ),
            },
            {
                path: 'chargue',
                loadChildren: () =>
                    import('./pages/settings/pages/chargue/chargue.module').then(
                        (m) => m.ChargueModule,
                    ),
            },
            {
                path: 'attendance',
                loadChildren: () =>
                    import('./pages/attendance/attendance.module').then(
                        (m) => m.AttedanceModule,
                    ),
            },
            {
                path: 'home',
                loadChildren: () =>
                    import('./pages/home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('./pages/settings/settings.module').then(
                        (m) => m.SettingsModule,
                    ),
            },
            {
                path: 'types',
                loadChildren: () =>
                    import('./pages/settings/pages/types/types.module').then(
                        (m) => m.TypesModule,
                    ),
            },
            {
                path: 'licence',
                loadChildren: () =>
                    import('./pages/settings/pages/licence/licence.module').then(
                        (m) => m.LicenceModule,
                    ),
            },
            {
                path: 'report-attendance',
                loadChildren: () =>
                    import(
                        './pages/settings/pages/report-attendance/report-attendance.module'
                    ).then((m) => m.ReportAttendanceModule),
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
