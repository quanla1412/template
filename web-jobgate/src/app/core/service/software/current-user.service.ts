import {UserModel} from '../../../data/schema/user.model';
import {Injectable} from '@angular/core';
import {AUTH_CONSTANT} from '../../constant/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private user: UserModel;

  constructor() {
    if (!this.user) {
      if (localStorage.getItem(AUTH_CONSTANT.USER_DATA)) {
        this.user = new UserModel(JSON.parse(localStorage.getItem(AUTH_CONSTANT.USER_DATA)));
      } else {
        this.user = new UserModel();
      }
    }
  }

  public getPhone() {
    return this.user.phone;
  }

  public getFullName() {
    return this.user.fullName;
  }

  public getUserModel() {
    return this.user.userModel;
  }

  public getPermissions() {
    return this.user.permissions;
  }

  public getUserId(): string | number {
    return this.user.id;
  }

  public setUser(userModel: UserModel) {
    this.user = new UserModel(userModel);
  }

  public hasPermissionList(permissionCode: string[]) {
    if (permissionCode.length === 0) {
      return true;
    }

    for (const item of permissionCode) {
      if (this.hasPermission(item)) {
        return true;
      }
    }

    return false;
  }

  public hasPermission(permissionCode: string) {
    const index = this.user.permissions.findIndex(value => {
      return value === permissionCode;
    });

    if (index !== -1) {
      return true;
    }

    return false;
  }
}
