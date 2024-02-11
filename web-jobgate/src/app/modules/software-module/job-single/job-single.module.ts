import {RouterModule, Routes} from '@angular/router';
import {JobSingleComponent} from './pages/job-single.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {NiceSelectModule} from 'ng-nice-select';

const COMPONENTS = [
];
export const routes: Routes = [
    {
        path: '',
        component: JobSingleComponent
    },
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        JobSingleComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NiceSelectModule
    ]
})
export class JobSingleModule {
}
