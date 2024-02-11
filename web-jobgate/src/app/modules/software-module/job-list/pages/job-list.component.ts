import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {AfterViewInit, Component} from '@angular/core';
import {JobPostingService} from '../../../../core/service/software/job-posting.service';
import {JobPostingSearchModel} from '../../../../data/schema/search/job-posting-search.model';
import {ProvinceModel} from '../../../../data/schema/province.model';
import {GeographyService} from '../../../../core/service/software/geography.service';
import {JOB_POSTING_STATUS} from '../../../../core/constant/job-posting-status.constant';
import {JOB_TYPE} from '../../../../core/constant/job-type.constant';
import {JobPostingModel} from '../../../../data/schema/recruitment/job-posting.model';
import {WORK_ARRANGEMENT} from '../../../../core/constant/work-arrangement.constant';
import {OccupationModel} from '../../../../data/schema/recruitment/occupation.model';
import {OccupationService} from '../../../../core/service/software/occupation.service';
import {ActivatedRoute} from '@angular/router';
import {JobPostingFullSearchModel} from "../../../../data/schema/search/job-posting-full-search.model";
import {JobPostingFullModel} from "../../../../data/schema/recruitment/job-posting-full.model";
import {LabelType} from "@angular-slider/ngx-slider";
import { Options } from "@angular-slider/ngx-slider";
import {colors} from "@angular/cli/utilities/color";

declare var $: any;

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
})
export class JobListComponent implements AfterViewInit {
    public search: JobPostingFullSearchModel = new JobPostingFullSearchModel();
    public totalPage = 0;
    public pageRange: number[] = new Array<number>();
    public recordOfPage = 10;
    public JOB_POSTING_STATUS = JOB_POSTING_STATUS;
    public JOB_TYPE = JOB_TYPE;
    public WORK_ARRANGEMENT = WORK_ARRANGEMENT;

    public displayColumn = false;

    public locations: ProvinceModel[] = [];
    public occupations: OccupationModel[] = [];

    public minSalary: number = 0;
    public maxSalary: number = 20000;
    public searchSalaryOptions: Options = {
        floor: 0,
        ceil: 20000,
        translate: string => {
            return null;
        },
        combineLabels: string => {
            return null;
        },
        getPointerColor: string => {
            return 'white';
        }
    };

    constructor(
        private modal: AppModals,
        private loading: AppLoading,
        private alert: AppAlert,
        private route: ActivatedRoute,
        private jobPostingService: JobPostingService,
        private geographyService: GeographyService,
        private occupationService: OccupationService
    ) {
    }

    ngAfterViewInit() {
        const modalMenu4 = $('.wd-filter-radio');

        if (modalMenu4.length) {
            $('.filter-radio').on('click', () => {
                modalMenu4.toggleClass('modal-menu--open');
            });
            $(document).on('click.filter-radio', (a) => {
                if (
                    $(a.target).closest('.filter-radio, .wd-filter-radio').length === 0
                ) {
                    modalMenu4.removeClass('modal-menu--open');
                }
            });
        }

        this.getData();
    }

    private getData() {
        this.getJobPostings();
        this.getLocations();
        this.getOccupations();
    }

    private getJobPostingCompleted(res: ResponseModel<JobPostingFullSearchModel>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        const jobs = [];
        this.search = res.result;
        this.search.result.forEach(job => jobs.push(new JobPostingFullModel(job)));
        this.search.result = jobs;
        this.calTotalPage();
        this.generateRangePage();
    }

    private getLocations() {
        this.loading.show();
        this.geographyService.getProvincesIsUsingByJobPosting().subscribe(res => this.getLocationsCompleted(res));
    }

    private getLocationsCompleted(res: ResponseModel<ProvinceModel[]>) {
        this.loading.hide();
        this.locations = res.result;
    }

    private getOccupations() {
        this.loading.show();
        this.occupationService.getAll().subscribe(res => this.getOccupationsCompleted(res));
    }

    private getOccupationsCompleted(res: ResponseModel<OccupationModel[]>) {
        this.loading.hide();
        this.occupations = res.result;
    }

    private calTotalPage() {
        if (this.search.totalRecords < this.search.recordOfPage) {
            this.totalPage = 1;
        }

        const totalPage: number = this.search.totalRecords / this.search.recordOfPage;
        this.totalPage = (this.search.totalRecords % this.search.recordOfPage) === 0
            ? Math.trunc(totalPage)
            : Math.trunc(totalPage) + 1;
    }

    private generateRangePage() {
        this.pageRange = [];
        const currentPage = this.search.currentPage + 1;
        const pagingRange = this.search.pagingRange;

        if (this.pageRange.length === 0) {
            if (pagingRange < this.totalPage) {
                this.pageRange = this.rangeFromTo(1, pagingRange);
            } else {
                this.pageRange = this.rangeFromTo(1, this.totalPage);
            }
        }


        const filter = this.pageRange.filter(num => num === currentPage);
        if (filter.length) {
            return;
        }

        if (currentPage > this.pageRange[pagingRange - 1]) {
            this.pageRange = this.rangeFromTo(currentPage - (pagingRange - 1), currentPage);
            return;
        }

        if (currentPage < this.pageRange[0]) {
            this.pageRange = this.rangeFromTo(currentPage, currentPage + (pagingRange - 1));
            return;
        }
    }

    private rangeFromTo(from: number, to: number) {
        const range = [];
        while (from <= to) {
            range.push(from);
            ++from;
        }
        return range;
    }

    public getJobPostings() {
        this.loading.show();
        this.search.occupationId = this.search.occupationId == null ? this.route.snapshot.queryParams.occupationId : this.search.occupationId;
        this.search.currentPage = 0;
        this.search.sortBy = 'created_date';
        this.search.recordOfPage = this.recordOfPage;
        this.search.result = null;
        this.search.minSalary = this.minSalary;
        this.search.maxSalary = this.maxSalary;
        this.jobPostingService.searchFull(this.search).subscribe(res => this.getJobPostingCompleted(res));
    }

    public showFirstLast() {
        return this.search.pagingRange < this.totalPage;
    }

    public disableFirstPaging() {
        if (this.search.currentPage + 1 === 1) {
            return 'disabled';
        }
    }

    public disableLastPaging() {
        if (this.search.currentPage + 1 === this.totalPage) {
            return 'disabled';
        }
    }

    public activePage(pageNumber: number) {
        if (this.search.currentPage === pageNumber) {
            return 'current';
        }
    }

    public selectPage(page: number) {
        if (page > this.totalPage) {
            this.search.currentPage = this.totalPage - 1;
            return;
        }

        if (page < 0) {
            this.search.currentPage = 0;
            return;
        }

        this.search.currentPage = page;
        this.generateRangePage();

        this.getJobPostings();
    }

    public changeDisplayType(displayColumn: boolean) {
        this.displayColumn = displayColumn;
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
