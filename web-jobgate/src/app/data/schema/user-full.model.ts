import {CountryModel} from './country.model';
import {ProvinceModel} from './province.model';
import {DistrictModel} from './district.model';
import {WardModel} from './ward.model';

export class UserFullModel {
    public id: string;
    public code: string;
    public fullName: string;
    public type: string;
    public username: string;
    public password: string;
    public phone: string;
    public email: string;
    public birthDate: string;
    public address: string;
    public country: CountryModel;
    public province: ProvinceModel;
    public district: DistrictModel;
    public ward: WardModel;
    public isDeleted: boolean;
    public createdDate: string;
    public updatedDate: string;
    public gender: string;

    public constructor(
        data?: UserFullModel
    ) {
        const userFull = data == null ? this : data;

        this.id = userFull.id;
        this.code = userFull.code;
        this.fullName = userFull.fullName;
        this.type = userFull.type;
        this.username = userFull.username;
        this.password = userFull.password;
        this.phone = userFull.phone;
        this.email = userFull.email;
        this.birthDate = userFull.birthDate;
        this.address = userFull.address;
        this.country = new CountryModel(userFull.country);
        this.province = new ProvinceModel(userFull.province);
        this.district = new DistrictModel(userFull.district);
        this.ward = new WardModel(userFull.ward);
        this.isDeleted = userFull.isDeleted;
        this.createdDate = userFull.createdDate;
        this.updatedDate = userFull.updatedDate;
        this.gender = userFull.gender;
    }
}
