import {NavigationStart, Router} from '@angular/router';
import {CurrentUserService} from './core/service/software/current-user.service';
import {Component, OnInit} from '@angular/core';
import {AppAlert} from './shared/utils';
import {ROUTER_EMPLOYEE_PERMISSION_MAPPER} from './core/constant/employee-permission.constant';
import {RouterPermissionMappingModel} from './data/data-components/router-permission-mapping.model';
import {AUTH_CONSTANT} from './core/constant/auth.constant';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'EZ Software';

  private anonymousUrls = [
    '/login',
    '/404',
    '/403'
  ];

  constructor(
    private router: Router,
    private alert: AppAlert,
    private currentUserService: CurrentUserService
  ) {
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.handleNavigation(event);
        }
      });
  }

  private handleNavigation(event: NavigationStart) {
    const auth = localStorage.getItem(AUTH_CONSTANT.AUTH_KEY);
    const notAuth = !auth || auth === 'undefined';
    const isIgnoreAuth = this.isIgnoreAuth(event.url);

    if (notAuth) {
      this.handleNotAuth(isIgnoreAuth);
    } else {
      this.handleAuthForEmployee(event.url, isIgnoreAuth);
    }
  }

  private handleNotAuth(isIgnoreAuth: boolean) {
    // TODO: Validate user
    if (isIgnoreAuth) {
      this.router.navigateByUrl('/login');
    }
  }

  private handleAuthForEmployee(url: string, isIgnoreAuth: boolean) {
    if (isIgnoreAuth) {
      if (!this.hasPermission(url)) {
        this.router.navigateByUrl('/403');
      }
    }
  }

  private hasPermission(url: string) {
    const permissionMapping = this.getByRouterLinkEmployee(url);

    if (permissionMapping === null) {
      return false;
    }
    return this.currentUserService.hasPermissionList(permissionMapping.permissions);
  }

  private getByRouterLinkEmployee(routerLink: string): RouterPermissionMappingModel {
    const index = ROUTER_EMPLOYEE_PERMISSION_MAPPER.findIndex(value => {
      let result = false;
      if (value.matchUrl) {
        const pattern = `^${value.matchUrl}`;
        const reg = new RegExp(pattern);
        result = reg.test(routerLink);
      }
      return value.routerLink === routerLink || result;
    });

    return index !== -1 ? new RouterPermissionMappingModel(ROUTER_EMPLOYEE_PERMISSION_MAPPER[index]) : null;
  }

  private isIgnoreAuth(url: string): boolean {
    return this.anonymousUrls.indexOf(url) !== -1;
  }
}
