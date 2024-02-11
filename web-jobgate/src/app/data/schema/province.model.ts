import {CountryModel} from "./country.model";

export class ProvinceModel {
  public id: string;
  public code: string;
  public name: string;
  public country: CountryModel;

  public constructor(
    data?: ProvinceModel
  ) {
    const province = data == null ? this : data;

    this.id = province.id;
    this.code = province.code;
    this.name = province.name;
    this.country = province.country || new CountryModel();
  }
}
