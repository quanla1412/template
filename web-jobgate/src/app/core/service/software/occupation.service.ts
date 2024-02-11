import {Injectable} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {Observable} from 'rxjs';
import {OccupationModel} from '../../../data/schema/recruitment/occupation.model';
import {RecruitmentBaseService} from '../generic/recruitment-base.service';

@Injectable({
    providedIn: 'root'
})
export class OccupationService extends RecruitmentBaseService {
    public getAll() {
        return this.get('/api/v1/occupation');
    }

    public getForDashboard() {
        return this.get('/api/v1/occupation/get-for-dashboard');
    }
}
