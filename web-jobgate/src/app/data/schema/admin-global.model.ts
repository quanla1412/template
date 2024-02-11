
export class AdminGlobalModel {
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public phone: string;

  public constructor(
    data?: AdminGlobalModel
  ) {
    const employee = data == null ? this : data;

    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.email = employee.email;
    this.password = employee.password;
    this.phone = employee.phone;
  }
}
