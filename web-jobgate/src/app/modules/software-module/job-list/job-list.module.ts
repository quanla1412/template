import {RouterModule, Routes} from '@angular/router';
import {JobListComponent} from './pages/job-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgModule} from '@angular/core';
import {NiceSelectModule} from "ng-nice-select";
import {SliderModule} from "primeng/slider";
import {MatSliderModule} from "@angular/material/slider";
import {NgxSliderModule} from "@angular-slider/ngx-slider";

const COMPONENTS = [
];
export const routes: Routes = [
    {
        path: '',
        component: JobListComponent
    },
];

@NgModule({
    declarations: [
        ...COMPONENTS,
        JobListComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NiceSelectModule,
        NgxSliderModule
    ]
})
export class JobListModule {
}
