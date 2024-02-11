import {ProvinceModel} from './province.model';

export class DistrictModel {
  public id: string;
  public code: string;
  public name: string;
  public province: ProvinceModel;

  public constructor(
    data?: DistrictModel
  ) {
    const district = data == null ? this : data;

    this.id = district.id;
    this.code = district.code;
    this.name = district.name;
    this.province = new ProvinceModel(district.province);
  }
}
