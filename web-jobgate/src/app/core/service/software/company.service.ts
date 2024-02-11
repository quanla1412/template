import {Injectable} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';
import {CompanyModel} from '../../../data/schema/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends UserBaseService {
  public getAll(): Observable<any> {
    return this.get('/api/v1/company');
  }

  public findAll(search: BaseSearchModel<CompanyModel[]>): Observable<any> {
    return this.post('/api/v1/company', search);
  }

  public getById(id: string): Observable<any> {
    return this.get(`/api/v1/company/${id}`);
  }

  public save(company: CompanyModel): Observable<any> {
    return this.post('/api/v1/company/insert', company);
  }

  public update(company: CompanyModel): Observable<any> {
    return this.put('/api/v1/company/update', company);
  }

  public deleteCompany(companyId: string): Observable<any> {
    return this.delete('/api/v1/company/delete', {id: companyId});
  }
}
