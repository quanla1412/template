export class UserCurrentModel {
  public id: string;
  public username: string;
  public fullName: string;
  public password: string;
  public keyAuth: string;
  public roleType: boolean;
  public permissions: string[];

  public constructor(
    data?: UserCurrentModel
  ) {
    const user = data == null ? this : data;

    this.id = user.id;
    this.username = user.username;
    this.fullName = user.fullName;
    this.password = user.password;
    this.keyAuth = user.keyAuth;
    this.roleType = user.roleType;
    this.permissions = user.permissions || [];
  }
}
