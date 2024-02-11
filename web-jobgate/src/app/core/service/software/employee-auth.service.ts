import {Injectable} from '@angular/core';
import {LoginModel} from '../../../data/schema/login.model';
import {Observable} from 'rxjs';
import {LoginSearchLazyModel} from '../../../data/schema/search/login-search-lazy.model';
import {UserBaseService} from '../generic/user-base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService extends UserBaseService {
  public login(login: LoginModel): Observable<any> {
    return this.post('/api/v1/auth/login', login);
  }

  public searchLogin(search: LoginSearchLazyModel): Observable<any> {
    return this.post('/api/v1/auth/searchLogin', search);
  }
}
