import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {AfterViewInit, Component} from '@angular/core';
import {JobPostingService} from '../../../../core/service/software/job-posting.service';
import {ProvinceModel} from '../../../../data/schema/province.model';
import {GeographyService} from '../../../../core/service/software/geography.service';
import {JOB_POSTING_STATUS} from '../../../../core/constant/job-posting-status.constant';
import {ActivatedRoute} from '@angular/router';
import {JobPostingFullModel} from '../../../../data/schema/recruitment/job-posting-full.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-single',
    templateUrl: './job-single.component.html',
})
export class JobSingleComponent implements AfterViewInit {
    public jobPosting = new JobPostingFullModel();
    public locations: ProvinceModel[] = [];

    private sanitizer: DomSanitizer;
    public googleMapEmbed;
    constructor(
        private modal: AppModals,
        private loading: AppLoading,
        private alert: AppAlert,
        private route: ActivatedRoute,
        private jobPostingService: JobPostingService,
        private geographyService: GeographyService
    ) {
        const id = this.route.snapshot.paramMap.get('id');

        this.resetData();
        this.getData(id);
    }

    ngAfterViewInit() {
    }

    private resetData() {
        this.jobPosting = new JobPostingFullModel();
    }

    private getData(jobPostingId: string) {
        this.getJobPosting(jobPostingId);
        this.getLocations();
    }

    private getJobPostingCompleted(res: ResponseModel<JobPostingFullModel>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.jobPosting = new JobPostingFullModel(res.result);
        if (!this.jobPosting.company.googleMapEmbed) {
            this.googleMapEmbed =  this.sanitizer.bypassSecurityTrustHtml(this.jobPosting.company.googleMapEmbed);
        }
    }

    private getLocations() {
        this.loading.show();
        this.geographyService.getProvincesIsUsingByJobPosting().subscribe(res => this.getLocationsCompleted(res));
    }

    private getLocationsCompleted(res: ResponseModel<ProvinceModel[]>) {
        this.loading.hide();
        this.locations = res.result;
    }

    public getJobPosting(id: string) {
        this.loading.show();
        this.jobPostingService.getFullById(id).subscribe(res => this.getJobPostingCompleted(res));
    }

    public displayLocaitons(locations: any[]): string {
        if (!locations || locations.length === 0) {
            return '';
        }

        const locationNames = locations.map(location => location.province.name);
        const filteredLocationNames = locationNames.filter(name => name);
        return filteredLocationNames.join(', ');
    }
}
