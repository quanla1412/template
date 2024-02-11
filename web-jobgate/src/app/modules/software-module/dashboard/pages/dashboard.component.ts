import {AfterViewInit, Component} from '@angular/core';
import Swiper from 'swiper';
import {OccupationModel} from '../../../../data/schema/recruitment/occupation.model';
import {OccupationService} from '../../../../core/service/software/occupation.service';
import {ResponseModel} from '../../../../data/schema/response.model';
import {ProvinceModel} from "../../../../data/schema/province.model";
import {AppLoading} from "../../../../shared/utils";
import {GeographyService} from "../../../../core/service/software/geography.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  public occupations: OccupationModel[] = [];
  public locations: ProvinceModel[] = [];
  public searchLocation = null;

  constructor(
      private loading: AppLoading,
      private router: Router,
      private geographyService: GeographyService,
      private occupationService: OccupationService
  ) {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
  ngAfterViewInit() {
    this.getData();
  }

  private resetData() {
    this.occupations = [];
  }

  private getData() {
    this.getOccupations();
    this.getLocations();
  }

  private getOccupations() {
    this.loading.show();
    this.occupationService.getForDashboard().subscribe(res => this.getOccupationCompleted(res));
  }

  private getOccupationCompleted(res: ResponseModel<OccupationModel[]>) {
    this.loading.hide();
    this.occupations = res.result;
  }

  private getLocations() {
    this.loading.show();
    this.geographyService.getProvincesIsUsingByJobPosting().subscribe(res => this.getLocationsCompleted(res));
  }

  private getLocationsCompleted(res: ResponseModel<ProvinceModel[]>) {
    this.loading.hide();
    this.locations = res.result;
  }

  public searchJob() {
    const queryParams = new Map();
    if (this.searchLocation != null) {
      queryParams.set('locationId', this.searchLocation);
    }

    this.router.navigate(['/job-list'], {queryParams});
  }

  onChangeLocation(evt: string) {
    console.log(evt)
  }
}
