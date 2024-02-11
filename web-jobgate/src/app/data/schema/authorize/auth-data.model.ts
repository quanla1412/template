export class AuthDataModel {
  clientKey: string;
  apiLoginID: string;

  constructor(data?: AuthDataModel) {
    const authData = data == null ? this : data;

    this.clientKey = authData.clientKey;
    this.apiLoginID = authData.apiLoginID;
  }
}
