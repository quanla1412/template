import {EmployeeAuthService} from '../../../core/service';
import {HTTP_CODE_CONSTANT} from '../../../core/constant/http-code.constant';
import {CurrentUserService} from '../../../core/service/software/current-user.service';
import {LoginModel} from '../../../data/schema/login.model';
import {Router} from '@angular/router';
import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {LoginSearchLazyModel} from '../../../data/schema/search/login-search-lazy.model';
import {AppAlert, AppLoading} from '../../../shared/utils';
import {debounceTime} from 'rxjs/operators';
import {fromEvent, Subscription} from 'rxjs';
import {ResponseModel} from '../../../data/schema/response.model';
import {JwtResponseModel} from '../../../data/schema/jwt-response.model';
import {AUTH_CONSTANT} from '../../../core/constant/auth.constant';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  public isSearched = false;
  public isSearching = false;
  public loginModel: LoginModel = new LoginModel();
  public loginSearches: LoginSearchLazyModel = new LoginSearchLazyModel();
  private el: any;
  private elDropdown: any;
  private usernameSub: Subscription;

  constructor(
    private loading: AppLoading,
    private alert: AppAlert,
    private employeeAuthService: EmployeeAuthService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    $('body').addClass('login-page adi-background-guest');
  }

  ngAfterViewInit() {
    $('body').Layout('fixLoginRegisterHeight');
    this.el = $('#login_phone_input');
    this.elDropdown = $('#login_phone_input ~ .dropdown-menu');

    // Catch hide dropdown
    $(document).click((e) => {
      this.elDropdown.removeClass('show');
    });

    // Stop emit click event to document
    this.el.click(e => {
      e.stopPropagation();
    });

    this.usernameSub = fromEvent(this.el, 'keydown').pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.loginSearches.result = [];
      const query = this.el.val().replace(/\D/gi, '');
      this.searchUsername(query);
    });

  }

  ngOnDestroy() {
    this.usernameSub.unsubscribe();
  }

  public enterEvent($keyBoard: KeyboardEvent = null) {
    if ($keyBoard != null && $keyBoard.key === 'Enter') {
      this.login();
    }
  }

  public onFocusUsername(event: any) {
    event.stopPropagation();

    if (this.isSearched) {
      this.elDropdown.addClass('show');
    }

    this.el.attr('placeholder', 'Phone number');
    this.el.inputmask('9{1,}');
  }

  public onBlurUsername() {
    this.el.inputmask('(999) 999(-9999){1,2}');
  }

  public onChangeUsername(username: string) {
    $('#login_password_input').focus();
    this.elDropdown.removeClass('show');
    this.el.inputmask('setvalue', username);
  }

  public login() {
    this.loading.show();

    // this.loginModel.username = this.el.val().replace(/\D/gi, '');
    this.employeeAuthService.login(this.loginModel).subscribe(res => this.loginCompleted(res));
  }

  public goToCustomerLogin() {
    this.router.navigateByUrl('/login-customer');
  }

  private searchUsername(value: string) {
    if (value.length < 3) {
      return;
    }

    if (!this.isSearched) {
      this.isSearched = true;
      this.elDropdown.addClass('show');
    }

    this.isSearching = true;
    this.loginSearches.username = value;

    this.employeeAuthService.searchLogin(this.loginSearches).subscribe(res => {
      this.isSearching = false;
      this.loginSearches = res.result;
    });
  }

  private loginCompleted(res: ResponseModel<JwtResponseModel>) {
    this.loading.hide();
    if (res.status !== HTTP_CODE_CONSTANT.OK) {
      res.message.forEach(value => {
        this.alert.error(value);
      });
      return;
    }

    const user = res.result.user;
    this.currentUserService.setUser(user);
    localStorage.setItem(AUTH_CONSTANT.USER_DATA, JSON.stringify(user));

    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.loading.hide();
    });
  }
}
