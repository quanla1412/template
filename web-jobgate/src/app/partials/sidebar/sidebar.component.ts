import {Component, OnInit} from '@angular/core';
import {EMPLOYEE_PERMISSION_CODE, ROUTER_EMPLOYEE_PERMISSION_MAPPER} from '../../core/constant/employee-permission.constant';
import {CurrentUserService} from '../../core/service/software/current-user.service';
import {RouterPermissionMappingModel} from '../../data/data-components/router-permission-mapping.model';
import {Router} from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public licenseGroups: RouterPermissionMappingModel[] = [];
  public employeeGroups: RouterPermissionMappingModel[] = [];

  constructor(
    public router: Router,
    private currentUserService: CurrentUserService
  ) {
  }

  ngOnInit(): void {
    const psSidebar = new PerfectScrollbar('#sidebarMenu', {
      suppressScrollX: true
    });

    $('.sidebar .nav-label').on('click', function(e){
      e.preventDefault();

      const target = $(this).next('.nav-sidebar');
      $(target).slideToggle(() => {
        psSidebar.update();
      });

    });

    $('.sidebar .has-sub').on('click', function(e){
      e.preventDefault();

      const target = $(this).next('.nav-sub');
      $(target).slideToggle(() => {
        psSidebar.update();
      });

      const siblings = $(this).closest('.nav-item').siblings();
      siblings.each(function(){
        const nav = $(this).find('.nav-sub');
        if (nav.is(':visible')) {
          nav.slideUp();
        }
      });
    });

    this.collectData();
  }

  public isActive(): boolean {
    return this.router.url === '/' || this.router.url === '/ticket-management';
  }

  private collectData() {
    const permissions = this.currentUserService.getPermissions();
    for (const item of permissions) {
      const mapper = this.getPermissionMapping(item);
      switch (item) {
        case EMPLOYEE_PERMISSION_CODE.LICENSE_MANAGEMENT:
        case EMPLOYEE_PERMISSION_CODE.COMPANY_MANAGEMENT:
          this.licenseGroups = this.licenseGroups.concat(mapper);
          break;
        case EMPLOYEE_PERMISSION_CODE.ROLES_MANAGEMENT:
        case EMPLOYEE_PERMISSION_CODE.EMPLOYEE_GROUP_MANAGEMENT:
        case EMPLOYEE_PERMISSION_CODE.EMPLOYEE_MANAGEMENT:
          this.employeeGroups = this.employeeGroups.concat(mapper);
          break;
      }
    }

    this.employeeGroups.sort(this.sortItems);
  }

  private getPermissionMapping(permissionCode: string): RouterPermissionMappingModel[] {
    const result: RouterPermissionMappingModel[] = [];
    for (const item of ROUTER_EMPLOYEE_PERMISSION_MAPPER) {
      const ind = item.permissions.findIndex(value => {
        return value === permissionCode;
      });
      if (item.isMenu && ind !== -1) {
        result.push(new RouterPermissionMappingModel(item));
      }
    }

    return result;
  }

  private sortItems(a: RouterPermissionMappingModel, b: RouterPermissionMappingModel): number {
    if (a.sort < b.sort) {
      return -1;
    }
    if (a.sort > b.sort) {
      return 1;
    }
    return 0;
  }
}
