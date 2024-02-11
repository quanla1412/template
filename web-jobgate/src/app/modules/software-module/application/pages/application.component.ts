import {AppAlert, AppLoading, AppModals} from '../../../../shared/utils';
import {HTTP_CODE_CONSTANT} from '../../../../core/constant/http-code.constant';
import {ResponseModel} from '../../../../data/schema/response.model';
import {AfterViewInit, Component} from '@angular/core';
import {JobPostingService} from '../../../../core/service/software/job-posting.service';
import {ProvinceModel} from '../../../../data/schema/province.model';
import {GeographyService} from '../../../../core/service/software/geography.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {ApplicantFullModel} from '../../../../data/schema/applicant-full.model';
import {GENDER} from '../../../../core/constant/gender.constant';
import {WardModel} from '../../../../data/schema/ward.model';
import {DistrictModel} from '../../../../data/schema/district.model';
import {APPLICANT_QUALIFICATION} from '../../../../core/constant/applicant-qualification.constant';
import {ApplicantService} from '../../../../core/service/software/applicant.service';
import {JobPostingModel} from '../../../../data/schema/recruitment/job-posting.model';

class FileReviewModel {
    file: File;
    url: string | Blob;
    extension: string;
}
@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
})
export class ApplicationComponent implements AfterViewInit {
    public GENDER = GENDER;
    public APPLICANT_QUALIFICATION = APPLICANT_QUALIFICATION;
    public jobPosting = new JobPostingModel();
    public applicant = new ApplicantFullModel();

    public provinces: ProvinceModel[] = [];
    public districts: DistrictModel[] = [];
    public wards: WardModel[] = [];

    public cvFile: FileReviewModel = new FileReviewModel();
    public insertApplicantSuccess = false;

    constructor(
        private modal: AppModals,
        private loading: AppLoading,
        private alert: AppAlert,
        private route: ActivatedRoute,
        private router: Router,
        private jobPostingService: JobPostingService,
        private applicantService: ApplicantService,
        private geographyService: GeographyService
    ) {
        const jobId = this.route.snapshot.queryParams.jobId;

        this.resetData();
        this.getData(jobId);
    }

    ngAfterViewInit() {
        const dropdown = (id) => {
            const obj = $(id + '.dropdown');
            const btn = obj.find('.btn-selector');
            const dd = obj.find('ul');
            const opt = dd.find('li');
            dd.hide();
            obj
                .on('mouseenter', function() {
                    dd.show();
                    dd.addClass('show');
                    $(this).css('z-index', 1000);
                })
                .on('mouseleave', function() {
                    dd.hide();
                    $(this).css('z-index', 'auto');
                    dd.removeClass('show');
                });

            opt.on('click', function() {
                dd.hide();
                const txt = $(this).html();
                opt.removeClass('active');
                $(this).addClass('active');
                btn.html(txt);
            });
        };
        const dropdown2 = (id) => {
            const obj = $(id + '.dropdown');
            const btn = obj.find('.btn-selector');
            const dd = obj.find('ul');
            const opt = dd.find('li');
            dd.hide();
            obj
                .on('mouseenter', function() {
                    dd.show();
                    dd.addClass('show');
                    $(this).css('z-index', 1000);
                })
                .on('mouseleave', function() {
                    dd.hide();
                    $(this).css('z-index', 'auto');
                    dd.removeClass('show');
                });

            opt.on('click', () => {
                dd.hide();
            });
        };
        dropdown('#item_date');
        dropdown('#item_city');
        dropdown('#item_district');
        dropdown('#item_ward');
        dropdown('#language');
        dropdown('#item_category');
        dropdown('#item_category2');
        dropdown('#item_apply');
        dropdown('#item_qualification');
        dropdown('#item_1');
        dropdown('#item_2');
        dropdown('#item_3');
        dropdown('#item_4');
        dropdown('#item_5');
        dropdown('#item_6');
        dropdown('#item_7');
        dropdown2('#items_1');
        dropdown2('#items_2');
        dropdown2('#items_3');
        dropdown2('#items_4');
        dropdown2('#items_5');
        dropdown2('#items_6');
    }

    private resetData() {
        this.jobPosting = new JobPostingModel();
        this.applicant = new ApplicantFullModel();
        this.cvFile = new FileReviewModel();

        this.applicant.user.isDeleted = false;
    }

    private getData(jobPostingId: string) {
        if (jobPostingId != null) {
            this.getJobPosting(jobPostingId);
        } else {
            this.jobPosting = null;
        }
        this.getProvinces();
    }

    private getJobPosting(id: string) {
        this.loading.show();
        this.jobPostingService.getById(id).subscribe(res => this.getJobPostingCompleted(res));
    }

    private getJobPostingCompleted(res: ResponseModel<JobPostingModel>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.jobPosting = res.result;
        this.applicant.jobPosting = res.result;
    }
    private getProvinces() {
        this.loading.show();
        this.geographyService.getAllProvinces().subscribe(res => this.getProvincesCompleted(res));
    }

    private getProvincesCompleted(res: ResponseModel<ProvinceModel[]>) {
        this.loading.hide();
        this.provinces = res.result;
    }

    public changeProvince(province: ProvinceModel) {
        this.applicant.user.province = new ProvinceModel(province);
        this.districts = [];
        this.applicant.user.district = new DistrictModel();
        this.wards = [];
        this.applicant.user.ward = new WardModel();

        this.getDistricts();
    }

    private getDistricts() {
        this.loading.show();
        this.geographyService.getDistrictsByProvinceId(this.applicant.user.province.id).subscribe(res => this.getDistrictsCompleted(res));
    }

    private getDistrictsCompleted(res: ResponseModel<DistrictModel[]>) {
        this.loading.hide();
        this.districts = res.result;
    }

    public changeDistrict(district: DistrictModel) {
        this.applicant.user.district = new DistrictModel(district);

        this.wards = [];
        this.applicant.user.ward = new WardModel();

        this.getWards();
    }

    private isValidApplicant() {
        const msg: string[] = [];

        if (!this.applicant.user.fullName) {
            msg.push('Vui lòng nhập họ tên ứng viên.');
        }

        if (!this.applicant.user.phone) {
            msg.push('Vui lòng nhập số điện thoại.');
        } else if (!this.applicant.user.phone.match(/^([0-9]{10})$/)) {
            msg.push('Vui lòng nhập đúng định dạng số điện thoại');
        }

        if (!this.applicant.user.email) {
            msg.push('Vui lòng nhập email.');
        } else if ( !this.applicant.user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            msg.push('Vui lòng nhập đúng định dạng email');
        }

        if (!this.applicant.user.birthDate) {
            msg.push('Vui lòng thêm ngày sinh.');
        }

        if (!this.applicant.user.gender) {
            msg.push('Vui lòng chọn giới tính.');
        }

        if (!this.cvFile.file) {
            msg.push('Vui lòng tải CV.');
        }

        if (this.jobPosting == null && this.applicant.waitingJobTitle == null) {
            msg.push('Vui lòng điền tiêu đề công việc muốn ứng tuyển');
        }

        msg.forEach(m => this.alert.error(m));
        return msg.length === 0;
    }

    private saveApplicantCompleted(res: ResponseModel<ApplicantFullModel>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.insertApplicantSuccess = true;
        this.applicant = res.result;
        this.saveFile(this.applicant.id);
    }

    public getWards() {
        this.geographyService.getWardsByDistrictId(this.applicant.user.district.id)
            .subscribe(res => this.getWardsCompleted(res));
    }

    private getWardsCompleted(res: ResponseModel<WardModel[]>) {
        this.loading.hide();
        this.wards = res.result;
    }

    public changeWard(ward: WardModel) {
        this.applicant.user.ward = new WardModel(ward);
    }

    public changeGender(gender: string) {
        this.applicant.user.gender = gender;
    }

    public changeQualification(qualification: string) {
        this.applicant.qualification = qualification;
    }

    public saveApplicant() {
        if (this.isValidApplicant()) {
            if (this.insertApplicantSuccess) {
                this.saveFile(this.applicant.id);
            } else {
                this.applicantService.save(this.applicant).subscribe(res => this.saveApplicantCompleted(res));
            }
        }
    }

    public onCVFileChange(event) {
        this.cvFile.file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.cvFile.url = reader.result as string;
        reader.readAsDataURL(this.cvFile.file);
        event.target.value = null;
        this.cvFile.extension = this.cvFile.file.name.split('.').pop();
    }

    public getFileIcon() {
        if (!this.cvFile.file) {
            return '';
        }

        if (this.cvFile.file.type === 'application/msword') {
            return 'fa-file-word';
        }
        if (this.cvFile.file.type === 'application/pdf') {
            return 'fa-file-pdf';
        }
        if (this.cvFile.file.type.includes('image')) {
            return 'fa-file-image';
        }

        return 'fa-file-alt';
    }

    public confirmDeleteCVFile() {
        this.modal.confirm('Chắc chắn muốn xóa file này?').subscribe((res: boolean) => {
            if (res) {
                this.cvFile = new FileReviewModel();
            }
        });
    }

    private saveFile(id: string) {
        const formData = new FormData();
        formData.append('files', this.cvFile.file);
        if (formData) {
            this.loading.show();
            this.applicantService.saveCVFile(id, formData).subscribe(res => this.saveFileCompleted(res));
        }
    }

    private saveFileCompleted(res: ResponseModel<any>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.router.navigate(['/dashboard']);
    }
}
