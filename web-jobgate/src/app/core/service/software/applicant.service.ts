import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserBaseService} from '../generic/user-base.service';
import {ApplicantFullModel} from '../../../data/schema/applicant-full.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicantService extends UserBaseService {
    public save(applicantModel: ApplicantFullModel): Observable<any> {
        return this.post('/api/v1/applicant/insert', applicantModel);
    }

    public saveCVFile(id: string, formData: FormData) {
        return this.put('/api/v1/applicant/save-cv-file/' + id, formData);
    }
}
