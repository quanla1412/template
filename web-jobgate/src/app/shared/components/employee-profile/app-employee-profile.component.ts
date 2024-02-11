import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {EmployeeModel} from '../../../data/schema/employee.model';
import {USER_MODE} from '../../../core/constant/user-model.constant';
import {CurrentUserService} from '../../../core/service/software/current-user.service';
import {Router} from '@angular/router';
import {AfterViewInit, Component} from '@angular/core';
import {AUTH_CONSTANT} from '../../../core/constant/auth.constant';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './app-employee-profile.component.html'
})
export class AppEmployeeProfileComponent implements AfterViewInit {
  public fullName: string;
  public search: BaseSearchModel<EmployeeModel[]> = new BaseSearchModel<EmployeeModel[]>();

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
  ) {
    this.fullName = currentUserService.getFullName();
  }

  ngAfterViewInit(): void {
  }

  public logout() {
    localStorage.removeItem(AUTH_CONSTANT.AUTH_KEY);
    const url = this.currentUserService.getUserModel() === USER_MODE.EMPLOYEE ? '/login' : 'login-customer';
    this.router.navigateByUrl(url);
  }

  public changePassword() {
    this.router.navigateByUrl('/change-password');
  }
}
