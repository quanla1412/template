import {Injectable} from '@angular/core';
import {BaseSearchModel} from '../../../data/schema/search/base-search.model';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';
import {DepartmentModel} from '../../../data/schema/department.model';
import {JobPostingFullModel} from '../../../data/schema/recruitment/job-posting-full.model';
import {JobPostingModel} from '../../../data/schema/recruitment/job-posting.model';
import {RecruitmentBaseService} from '../generic/recruitment-base.service';
import {JobPostingSearchModel} from '../../../data/schema/search/job-posting-search.model';
import {JobPostingFullSearchModel} from "../../../data/schema/search/job-posting-full-search.model";

@Injectable({
    providedIn: 'root'
})
export class JobPostingService extends RecruitmentBaseService {
    public getById(id: string): Observable<any> {
        return this.get(`/api/v1/job-posting/${id}`);
    }

    public search(search: JobPostingSearchModel): Observable<any> {
        return this.post('/api/v1/job-posting/search', search);
    }

    public searchFull(search: JobPostingFullSearchModel): Observable<any> {
        return this.post('/api/v1/job-posting/search-full', search);
    }

    public getFullById(id: string): Observable<any> {
        return this.get(`/api/v1/job-posting/get-full/${id}`);
    }

    public save(jobPostingFullModel: JobPostingFullModel): Observable<any> {
        return this.post('/api/v1/job-posting/insert', jobPostingFullModel);
    }

    public update(jobPostingFullModel: JobPostingFullModel): Observable<any> {
        return this.put('/api/v1/job-posting/update', jobPostingFullModel);
    }

    public deleteJobPosting(jobPostingId: string): Observable<any> {
        return this.delete('/api/v1/job-posting/delete', {id: jobPostingId});
    }
}
