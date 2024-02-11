import {CompanyModel} from '../company.model';
import {JobPostingKeywordModel} from './job-posting-keyword.model';
import {DepartmentModel} from '../department.model';
import {JOB_TYPE} from '../../../core/constant/job-type.constant';
import {OccupationModel} from './occupation.model';
import {WORK_ARRANGEMENT} from '../../../core/constant/work-arrangement.constant';
import {JobPostingLocationModel} from './job-posting-location.model';
import {JobPositionModel} from './job-position.model';
import {EmployeeFullModel} from '../employee-full.model';

export class JobPostingFullModel {
  public id: string;
  public code: string;
  public title: string;
  public status: string;
  public quantity: number;
  public occupation: OccupationModel;
  public jobPosition: JobPositionModel;
  public company: CompanyModel;
  public department: DepartmentModel;
  public jobType: string;
  public workArrangement: string;
  public description: string;
  public requirement: string;
  public benefit: string;
  public reason: string;
  public minSalary: number;
  public maxSalary: number;
  public deadline: string;
  public recruiterEmployee: EmployeeFullModel;
  public userId: string;
  public approvalDate: string;
  public createdDate: string;
  public updatedDate: string;

  public keywords: JobPostingKeywordModel[];
  public locations: JobPostingLocationModel[];

  public constructor(
    data?: JobPostingFullModel
  ) {
    const post = data == null ? this : data;

    this.id = post.id;
    this.code = post.code;
    this.title = post.title;
    this.status = post.status;
    this.quantity = post.quantity;
    this.occupation = new OccupationModel(post.occupation);
    this.jobPosition = new JobPositionModel(post.jobPosition);
    this.company = new CompanyModel(post.company);
    this.department = new DepartmentModel(post.department);
    this.jobType = post.jobType;
    this.workArrangement = post.workArrangement;
    this.description = post.description;
    this.requirement = post.requirement;
    this.benefit = post.benefit;
    this.reason = post.reason;
    this.minSalary = post.minSalary;
    this.maxSalary = post.maxSalary;
    this.deadline = post.deadline;
    this.recruiterEmployee = new EmployeeFullModel(post.recruiterEmployee);
    this.userId = post.userId;
    this.approvalDate = post.approvalDate;
    this.createdDate = post.createdDate;
    this.updatedDate = post.updatedDate;

    this.keywords = post.keywords || [];
    this.locations = post.locations || [];
  }

  public displayJobType() {
    switch (this.jobType) {
      case JOB_TYPE.INTERNSHIP:
        return 'Thực tập';
      case JOB_TYPE.FULL_TIME:
        return 'Full-time';
      case JOB_TYPE.PART_TIME:
        return 'Part-time';
    }

    return '';
  }

  public displayWorkArrangement() {
    switch (this.workArrangement) {
      case WORK_ARRANGEMENT.ON_SITE:
        return 'On site';
      case WORK_ARRANGEMENT.REMOTE:
        return 'Remote';
      case WORK_ARRANGEMENT.HYBRID:
        return 'Hybrid';
    }

    return '';
  }
}
