import {Injectable} from '@angular/core';
import {LoginModel} from '../../../data/schema/login.model';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends UserBaseService {
  public login(login: LoginModel): Observable<any> {
    return this.post('/anonymous/api/v1/auth/login', login);
  }
}
