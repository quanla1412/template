import {BaseSearchModel} from './base-search.model';
import {JobPostingModel} from '../recruitment/job-posting.model';
import {JobPostingFullModel} from "../recruitment/job-posting-full.model";

export class JobPostingFullSearchModel extends BaseSearchModel<JobPostingFullModel[]> {
  public code: string;
  public title: string;
  public minSalary: number;
  public maxSalary: number;
  public status: string;
  public location: string;
  public jobType: string;
  public workArrangement: string;
  public occupationId: string;

  constructor(data?: JobPostingFullSearchModel) {
    super(data);
    const search = data == null ? this : data;

    this.code = search.code;
    this.title = search.title;
    this.minSalary = search.minSalary;
    this.maxSalary = search.maxSalary;
    this.status = search.status;
    this.location = search.location;
    this.jobType = search.jobType;
    this.workArrangement = search.workArrangement;
    this.occupationId = search.occupationId;
  }
}
