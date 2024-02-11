import {DistrictModel} from './district.model';

export class WardModel {
  public id: string;
  public code: string;
  public name: string;
  public district: DistrictModel;

  public constructor(
    data?: WardModel
  ) {
    const ward = data == null ? this : data;

    this.id = ward.id;
    this.code = ward.code;
    this.name = ward.name;
    this.district = ward.district || new DistrictModel();
  }
}
