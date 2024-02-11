import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';

@Injectable({
  providedIn: 'root'
})
export class GeographyService extends UserBaseService {
  public getAllProvinces(): Observable<any> {
    return this.get('/api/v1/geography/province');
  }

  public getProvincesIsUsingByJobPosting(): Observable<any> {
    return this.get('/api/v1/geography/province/is-using-by-job-posting');
  }

  public getDistrictsByProvinceId(provinceId: string): Observable<any> {
    return this.get(`/api/v1/geography/district/get-by-province-id/${provinceId}`);
  }

  public getWardsByDistrictId(districtId: string): Observable<any> {
    return this.get(`/api/v1/geography/ward/get-by-district-id/${districtId}`);
  }
}
