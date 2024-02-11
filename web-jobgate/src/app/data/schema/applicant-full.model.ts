import {UserFullModel} from './user-full.model';
import {JobPostingModel} from './recruitment/job-posting.model';

export class ApplicantFullModel {
    public id: string;
    public status: string;
    public imageUrl: string;
    public cvUrl: string;
    public appliedDate: string;
    public jobPosting: JobPostingModel;
    public waitingJobTitle: string;
    public yearsOfExperience: number;
    public nearestJobPosition: string;
    public qualification: string;
    public linkFacebook: string;
    public linkLinkedin: string;
    public user: UserFullModel;

    public constructor(
        data?: ApplicantFullModel
    ) {
        const applicant = data == null ? this : data;

        this.id = applicant.id;
        this.status = applicant.status;
        this.imageUrl = applicant.imageUrl;
        this.cvUrl = applicant.cvUrl;
        this.appliedDate = applicant.appliedDate;
        this.jobPosting = new JobPostingModel(applicant.jobPosting);
        this.waitingJobTitle = applicant.waitingJobTitle;
        this.yearsOfExperience = applicant.yearsOfExperience || null;
        this.nearestJobPosition = applicant.nearestJobPosition;
        this.qualification = applicant.qualification;
        this.linkFacebook = applicant.linkFacebook || '';
        this.linkLinkedin = applicant.linkLinkedin || '';
        this.user = new UserFullModel(applicant.user);
    }
}
