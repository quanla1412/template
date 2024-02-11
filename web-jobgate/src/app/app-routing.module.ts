import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LayoutComponent} from './partials/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/software-module/app-pages.module').then((m) => m.AppPagesModule)
      },
    ],
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/login/login.module').then((m) => m.LoginModule),
      },
    ],
  },
  {
    path: 'change-password',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
    ],
  },
  {
    path: '404',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/404/not-found.module').then((m) => m.NotFoundModule),
      },
    ],
  },
  {
    path: '403',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/403/access-denied.module').then((m) => m.AccessDeniedModule),
      },
    ],
  },
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
