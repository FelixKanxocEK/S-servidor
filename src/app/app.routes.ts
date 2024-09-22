import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
    },
    {
        path: '',
        component: ContentLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: '',
                loadChildren: () => import('./pages/extensions/extensions.module').then(m => m.ExtensionsModule),
            },
            {
                path: '',
                loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
            },
            {
                path: '',
                loadChildren: () => import('./pages/access_services/access-services.module').then(m => m.AccessServicesModule),
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
