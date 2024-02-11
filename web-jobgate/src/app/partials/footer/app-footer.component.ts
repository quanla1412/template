import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WebSettingService} from '../../core/service/software/web-setting.service';
import {AppAlert, AppLoading} from '../../shared/utils';
import {WebSettingModel} from '../../data/schema/web-setting.model';
import {ResponseModel} from '../../data/schema/response.model';
import {HTTP_CODE_CONSTANT} from '../../core/constant/http-code.constant';
import {WEB_SETTING_KEY} from '../../core/constant/web-setting-key.constant';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
})
export class AppFooterComponent implements OnInit {
    public webSettings: WebSettingModel[] = [];
    public WEB_SETTING_KEY = WEB_SETTING_KEY;

    constructor(
        private loading: AppLoading,
        private alert: AppAlert,
        private webSettingService: WebSettingService
    ) {
    }

    ngOnInit() {
        this.getWebSettings();
    }

    private getWebSettings() {
        this.loading.show();
        this.webSettingService.getAll().subscribe(res => this.getWebSettingsCompleted(res));
    }

    private getWebSettingsCompleted(res: ResponseModel<WebSettingModel[]>) {
        this.loading.hide();
        if (res.status !== HTTP_CODE_CONSTANT.OK) {
            res.message.forEach(value => {
                this.alert.error(value);
            });
            return;
        }

        this.webSettings = res.result;
        this.webSettings = this.webSettings.sort((a, b) => a.key.localeCompare(b.key));
    }

    public getSetting(key: string) {
        const setting = this.webSettings.filter(s => s.key === key)[0];

        return setting.value;
    }
}
