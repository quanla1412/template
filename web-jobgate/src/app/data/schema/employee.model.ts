import {UserModel} from './user.model';

export class EmployeeModel {
  public id: string;
  public positionId: string;
  public user: UserModel;

  public constructor(
    data?: EmployeeModel
  ) {
    const employee = data == null ? this : data;

    this.id = employee.id;
    this.positionId = employee.positionId;
    this.user = new UserModel(employee.user);
  }
}
