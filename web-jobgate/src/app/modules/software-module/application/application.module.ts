import {RouterModule, Routes} from '@angular/router';
import {ApplicationComponent} from './pages/application.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {NiceSelectModule} from 'ng-nice-select';

const COMPONENTS = [
];
export const routes: Routes = [
    {
        path: '',
        component: ApplicationComponent
    },
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ApplicationComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NiceSelectModule
    ]
})
export class ApplicationModule {
}
