export class UserModel {
  public id: string;
  public code: string;
  public fullName: string;
  // @ts-ignore
  public type: string;
  public username: string;
  public phone: string;
  public email: string;
  public birthDate: string;
  public isDeleted: boolean;
  public createdDate: string;
  public updatedDate: string;
  public gender: string;
  public userModel: string;
  public permissions: string[];

  public constructor(
    data?: UserModel
  ) {
    const user = data == null ? this : data;

    this.id = user.id;
    this.code = user.code;
    this.fullName = user.fullName;
    this.type = user.type;
    this.username = user.username;
    this.phone = user.phone;
    this.email = user.email;
    this.birthDate = user.birthDate;
    this.isDeleted = user.isDeleted;
    this.createdDate = user.createdDate;
    this.updatedDate = user.updatedDate;
    this.gender = user.gender;
    this.userModel = user.userModel;
    this.permissions = user.permissions || [];
  }
}
