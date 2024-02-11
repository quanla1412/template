import {JobPostingModel} from './job-posting.model';
import {ProvinceModel} from '../province.model';

export class JobPostingLocationModel {
    public id: string;
    public jobPosting: JobPostingModel;
    public province: ProvinceModel;

    public constructor(
        data?: JobPostingLocationModel
    ) {
        const jobPostingProvince = data == null ? this : data;

        this.id = jobPostingProvince.id;
        this.jobPosting = new JobPostingModel(jobPostingProvince.jobPosting);
        this.province = new ProvinceModel(jobPostingProvince.province);
    }
}
