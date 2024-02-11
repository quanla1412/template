import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

// Pipes
import * as Pipes from '../shared/utils/pipes';

// Components
import {AppAdiBoxComponent} from './components/adi-box/app-adi-box.component';
import {AppDataTableComponent} from './components/data-table/app-data-table.component';
import {DropdownMenuComponent} from './components/dropdown-menu/dropdown-menu.component';
import {InputMaskComponent} from './components/input-mask/input-mask.component';
import {AppModalWrapperComponent} from './components/modal-wrapper/app-modal-wrapper.component';
import {AppScanBarcodeComponent} from './components/scan-barcode/app-scan-barcode.component';
import {AppSelect2ControlComponent} from './components/select2/app-select2-control.component';
import {AppSelect2AsyncComponent} from './components/select2-async/app-select2-async.component';
import {AppSwitchControlComponent} from './components/switch/app-switch-control.component';
import {AppFileDragDropControlComponent} from './components/upload/drag-drop/app-file-drag-drop-control.component';
import {AppFileNormalControlComponent} from './components/upload/normal/app-file-normal-control.component';
import {AppEmployeeProfileComponent} from './components/employee-profile/app-employee-profile.component';
import {AppMessageNotificationComponent} from './components/notification/message/app-message-notification.component';
import {AppDataTable2Component} from './components/data-table-2/app-data-table-2.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AppDateComponent} from './components/date/app-date.component';
import {AppChipsInputComponent} from './components/chips/app-chips-input.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

const COMPONENTS = [
  AppAdiBoxComponent,
  AppDataTableComponent,
  AppDataTable2Component,
  DropdownMenuComponent,
  InputMaskComponent,
  AppModalWrapperComponent,
  AppScanBarcodeComponent,
  AppSelect2ControlComponent,
  AppSelect2AsyncComponent,
  AppSwitchControlComponent,
  AppFileDragDropControlComponent,
  AppFileNormalControlComponent,
  AppEmployeeProfileComponent,
  AppMessageNotificationComponent,
  AppDateComponent,
  AppChipsInputComponent
];

const PIPES = [
  Pipes.PhonePipe,
  Pipes.SafePipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FormsModule,
    AutoCompleteModule
  ]
})
export class SharedModule {
}
