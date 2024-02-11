import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
    ],
  },
  {
    path: 'job-list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./job-list/job-list.module').then((m) => m.JobListModule),
      },
    ],
  },
  {
    path: 'job-single',
    children: [
      {
        path: ':id',
        loadChildren: () =>
            import('./job-single/job-single.module').then((m) => m.JobSingleModule),
      },
    ],
  },
  {
    path: 'application',
    children: [
      {
        path: '',
        loadChildren: () =>
            import('./application/application.module').then((m) => m.ApplicationModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesRoutingModule {
}
