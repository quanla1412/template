import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RecruitmentBaseService} from '../generic/recruitment-base.service';

@Injectable({
    providedIn: 'root'
})
export class WebSettingService extends RecruitmentBaseService {
    public getAll(): Observable<any> {
        return this.get('/api/v1/web-setting');
    }
}
