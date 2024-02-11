import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import * as Services from './core/service';
import * as Utils from './shared/utils';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';

import {SidebarComponent} from './partials/sidebar/sidebar.component';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {AppFooterComponent} from './partials/footer/app-footer.component';
import {LayoutComponent} from './partials/layout/layout.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {QuillModule} from 'ngx-quill';


const PARTIALS = [
  LayoutComponent,
  SidebarComponent,
  NavbarComponent,
  AppFooterComponent
];

const UTILS_PROVIDERS = [
  Utils.AppModals,
  Utils.AppLoading,
  Utils.AppAlert,
  Utils.AppGuid
];

@NgModule({
  declarations: [
    AppComponent,
    PARTIALS,
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // App
    AppRoutingModule,

    // QuillEditor
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Services.CustomHandleInterceptor,
      multi: true
    },
    ...UTILS_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
