import {CompanyModel} from './company.model';

export class DepartmentModel {
    public id: string;
    public name: string;
    public code: string;
    public company: CompanyModel;

    public constructor(
        data?: DepartmentModel
    ) {
        const department = data == null ? this : data;

        this.id = department.id;
        this.name = department.name;
        this.code = department.code;
        this.company = new CompanyModel(department.company);
    }
}



