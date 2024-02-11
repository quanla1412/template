import {JobPostingModel} from './job-posting.model';

export class JobPostingKeywordModel {
  public id: string;
  public jobPosting: JobPostingModel;
  public keyword: string;

  public constructor(
    data?: JobPostingKeywordModel
  ) {
    const jobPostingKeyword = data == null ? this : data;

    this.id = jobPostingKeyword.id;
    this.jobPosting = new JobPostingModel(jobPostingKeyword.jobPosting);
    this.keyword = jobPostingKeyword.keyword;
  }
}
