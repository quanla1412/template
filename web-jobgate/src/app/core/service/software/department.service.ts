import {Injectable} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';
import {DepartmentModel} from '../../../data/schema/department.model';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService extends UserBaseService {
    public getAll(): Observable<any> {
        return this.get('/api/v1/department');
    }

    public findAll(search: BaseSearchModel<DepartmentModel[]>): Observable<any> {
        return this.post('/api/v1/department', search);
    }

    public getById(id: string): Observable<any> {
        return this.get(`/api/v1/department/${id}`);
    }

    public getByCompanyId(companyId: string): Observable<any> {
        return this.get(`/api/v1/department/get-by-company-id/${companyId}`);
    }

    public save(department: DepartmentModel): Observable<any> {
        return this.post('/api/v1/department/insert', department);
    }

    public update(department: DepartmentModel): Observable<any> {
        return this.put('/api/v1/department/update', department);
    }

    public deleteDepartment(departmentId: string): Observable<any> {
        return this.delete('/api/v1/department/delete', {id: departmentId});
    }
}
