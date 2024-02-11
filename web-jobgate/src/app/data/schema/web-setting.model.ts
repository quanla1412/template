export class WebSettingModel {
  public id: string;
  public label: string;
  public key: string;
  public value: string;

  public constructor(
    data?: WebSettingModel
  ) {
    const setting = data == null ? this : data;

    this.id = setting.id;
    this.label = setting.label;
    this.key = setting.key;
    this.value = setting.value;
  }
}
