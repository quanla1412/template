import {EmployeeFullModel} from '../../../data/schema/employee-full.model';
import {Injectable} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {EmployeeModel} from '../../../data/schema/employee.model';
import {ChangePasswordModel} from '../../../data/schema/change-password.model';
import {JobPostingSearchModel} from '../../../data/schema/search/job-posting-search.model';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService extends UserBaseService {
    public findAll(): Observable<any> {
        return this.get('/api/v1/employee/findAll', {});
    }

    public find(search: BaseSearchModel<EmployeeModel[]>): Observable<any> {
        return this.post('/api/v1/employee/findAll', search);
    }

    public findOnBooking(): Observable<any> {
        return this.get('/api/v1/employee/findOnBooking');
    }

    public getEmployee(employeeId: number): Observable<any> {
        return this.get('/api/v1/employee/' + employeeId);
    }

    public search(search: JobPostingSearchModel): Observable<any> {
        return this.post('/api/v1/employee/search', search);
    }

    public resetPassword(employeeId: number): Observable<any> {
        return this.get('/api/v1/employee/reset-password/' + employeeId);
    }

    public save(employee: EmployeeFullModel): Observable<any> {
        return this.post('/api/v1/employee/insert', employee);
    }

    public update(employee: EmployeeFullModel): Observable<any> {
        return this.put('/api/v1/employee/update', employee);
    }

    public deleteEmployee(employeeId: number): Observable<any> {
        return this.delete('/api/v1/employee/delete', {id: employeeId});
    }

    public getEmployeeWaiting(status: string): Observable<any> {
        return this.get('/api/v1/employee/working-status/' + status);
    }

    public changePassword(changePassword: ChangePasswordModel): Observable<any> {
        return this.put('/api/v1/employee/change-password', changePassword);
    }
}
