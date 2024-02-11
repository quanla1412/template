import {UserFullModel} from './user-full.model';
import {JobPositionModel} from './recruitment/job-position.model';

export class EmployeeFullModel {
  public id: string;
  public position: JobPositionModel;
  public user: UserFullModel;


  public constructor(
    data?: EmployeeFullModel
  ) {
    const employee = data == null ? this : data;

    this.id = employee.id;
    this.position = new JobPositionModel(employee.position);
    this.user = new UserFullModel(employee.user);
  }
}
