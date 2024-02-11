import {AppLoading} from '../../../utils';
import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-message-notification',
  templateUrl: './app-message-notification.component.html'
})
export class AppMessageNotificationComponent implements AfterViewInit {

  constructor(
    private loading: AppLoading
  ) {
  }

  ngAfterViewInit() {
  }
}
