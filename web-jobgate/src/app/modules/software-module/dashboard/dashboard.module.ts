import {NgModule} from '@angular/core';
import {DashboardComponent} from './pages/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {NiceSelectModule} from 'ng-nice-select';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NiceSelectModule
  ]
})
export class DashboardModule {
}
