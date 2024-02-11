import {WardModel} from './ward.model';
import {DistrictModel} from './district.model';
import {ProvinceModel} from './province.model';
import {CountryModel} from './country.model';
import {COMPANY_LEVEL} from '../../core/constant/company-type.constant';
import {COMPANY_SIZE} from "../../core/constant/company-size.constant";

export class CompanyModel {
  public id: string;
  public name: string;
  public code: string;
  public level: string;
  public parent: CompanyModel;
  public isUsing: boolean;
  public address: string;
  public ward: WardModel;
  public district: DistrictModel;
  public province: ProvinceModel;
  public country: CountryModel;
  public managerId: string;
  public googleMapEmbed: string;
  public website: string;
  public email: string;
  public industry: string;
  public foundedYear: number;
  public companySize: string;
  public linkFacebook: string;
  public linkLinkedin: string;
  public createdDate: string;
  public updatedDate: string;


  public constructor(
    data?: CompanyModel
  ) {
    const company = data == null ? this : data;

    this.id = company.id;
    this.name = company.name;
    this.code = company.code;
    this.level = company.level == null ? COMPANY_LEVEL.LEVEL_1 : company.level;
    this.parent = company.parent;
    this.isUsing = company.isUsing || false;
    this.address = company.address;
    this.ward = new WardModel(company.ward);
    this.district = new DistrictModel(company.district);
    this.province = new ProvinceModel(company.province);
    this.country = new CountryModel(company.country);
    this.managerId = company.managerId;
    this.googleMapEmbed = company.googleMapEmbed;
    this.website = company.website;
    this.email = company.email;
    this.industry = company.industry;
    this.foundedYear = company.foundedYear;
    this.companySize = company.companySize;
    this.linkFacebook = company.linkFacebook;
    this.linkLinkedin = company.linkLinkedin;
    this.createdDate = company.createdDate;
    this.updatedDate = company.updatedDate;
  }

  public displayCompanySize() {
    switch (this.companySize){
      case COMPANY_SIZE.SMALL:
        return '1 - 49 nhân viên';
      case COMPANY_SIZE.MEDIUM:
        return '50 - 249 nhân viên';
      case COMPANY_SIZE.LARGE:
        return '250 nhân viên trở lên';
    }
    return '';
  }

  public displayAddress() {
    const elements = [];
    if (!!this.address) {
      elements.push(this.address);
    }
    if (!!this.ward && !!this.ward.id) {
      elements.push(this.ward.name);
    }
    if (!!this.district && !!this.district.id) {
      elements.push(this.district.name);
    }
    if (!!this.province && !!this.province.id) {
      elements.push(this.province.name);
    }

    return elements.join(', ');
  }

  public getMapUrl() {
    const elements = [];
    if (!!this.ward && !!this.ward.id) {
      elements.push(this.ward.name);
    }
    if (!!this.district && !!this.district.id) {
      elements.push(this.district.name);
    }
    if (!!this.province && !!this.province.id) {
      elements.push(this.province.name);
    }
    return `https://maps.google.com/maps?q=${elements.join('%20%')}&t=&z=20&ie=UTF8&iwloc=&output=embed&z=12`;
  }
}
