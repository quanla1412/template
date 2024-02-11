import {AppAlert, AppLoading} from '../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {ChangePasswordModel} from '../../../data/schema/change-password.model';
import {ResponseModel} from '../../../data/schema/response.model';
import {Router} from '@angular/router';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import {Component} from '@angular/core';
import {EmployeeService} from '../../../core/service/software/employee.service';
import {AppValidation} from '../../../shared/utils/app-validation';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {

  public changePasswordModel: ChangePasswordModel = new ChangePasswordModel();

  constructor(
      private loading: AppLoading,
      private alert: AppAlert,
      private employeeService: EmployeeService,
      private router: Router,
      private validation: AppValidation
  ) {
  }

  public enterEvent($keyBoard: KeyboardEvent = null) {
    if ($keyBoard != null && $keyBoard.key === 'Enter') {
      this.changePassword();
    }
  }

  public changePassword() {
    if (this.changePasswordModel.newPassword !== this.changePasswordModel.confirmation) {
      this.alert.error('Mật khẩu không khớp nhau');
      return;
    }

    if (!this.validation.validatePassword(this.changePasswordModel.newPassword)) {
      this.alert.error('Mật khẩu mới có từ 6 ký tự, trong đó có ít nhất 1 chữ cái in hoa và 1 số');
      return;
    }

    this.loading.show();
    this.employeeService.changePassword(this.changePasswordModel).subscribe(res => this.changePasswordCompleted(res));
  }

  public back() {
    this.router.navigateByUrl('/dashboard');
  }

  private changePasswordCompleted(res: ResponseModel<JwtResponseModel>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    this.alert.success(res.message[0]);
    this.router.navigateByUrl('/dashboard');
  }
}

