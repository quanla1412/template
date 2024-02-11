import {BaseSearchModel} from './base-search.model';
import {JobPostingModel} from '../recruitment/job-posting.model';

export class JobPostingSearchModel extends BaseSearchModel<JobPostingModel[]> {
  public code: string;
  public title: string;
  public status: string;
  public location: string;
  public jobType: string;
  public workArrangement: string;
  public occupationId: string;

  constructor(data?: JobPostingSearchModel) {
    super(data);
    const search = data == null ? this : data;

    this.code = search.code;
    this.title = search.title;
    this.status = search.status;
    this.location = search.location;
    this.jobType = search.jobType;
    this.workArrangement = search.workArrangement;
    this.occupationId = search.occupationId;
  }
}
