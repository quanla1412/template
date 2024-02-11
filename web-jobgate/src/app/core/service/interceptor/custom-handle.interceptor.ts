import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppAlert, AppLoading } from '../../../shared/utils';
import { AUTH_CONSTANT } from '../../constant/auth.constant';
import { Router } from '@angular/router';
import { HTTP_CODE_CONSTANT } from '../../constant/http-code.constant';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CustomHandleInterceptor implements HttpInterceptor {
  constructor(
      private alert: AppAlert,
      private loading: AppLoading,
      private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const authorization = localStorage.getItem(AUTH_CONSTANT.AUTH_KEY);
    const authorization = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwNTcyMDU4MCwiZXhwIjoxNzA3MTkxODA5LCJ1c2VybmFtZSI6ImFkbWluIn0.cJWgx7LIU2iL1yaJMWk4OVkRqrLJWFfQOtEvSrcbvJ0';
    let customReq = req;
    if (authorization) {
      customReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authorization)
      });
    }

    return next.handle(customReq).pipe(
        tap(
            (event: HttpEvent<any>) => {
              if (event instanceof HttpResponse && event.url.match('/auth/login')) {
                if (event.body.result.token) {
                  localStorage.setItem(AUTH_CONSTANT.AUTH_KEY, event.body.result.token);
                }
              }
              if (event instanceof HttpResponse && event.body?.status !== HTTP_CODE_CONSTANT.OK) {
                event.body?.message?.forEach(msg => this.alert.error(msg));
                this.loading.hideAll();
                throw new Error();
              }
              if (event instanceof HttpResponse && event.body?.status === HTTP_CODE_CONSTANT.OK) {
                if (event.body?.message[0] !== '') {
                  this.alert.success(event.body.message[0]);
                }
              }
            },
            (error: any) => {
              if (error instanceof HttpErrorResponse) {
                if (error.error && error.error.message) {
                  if (Array.isArray(error.error.message)) {
                    error.error.message.forEach(msg => {
                      if (msg !== '') { this.alert.error(msg); }
                    });
                  }
                  if (typeof error.error.message === 'string') {
                    this.alert.error(error.error.message);
                  }
                } else if (error.message) {
                  this.alert.error(error.message);
                }
                this.loading.hideAll();
                if (error.status === 401) {
                  localStorage.removeItem(AUTH_CONSTANT.AUTH_KEY);
                  this.router.navigateByUrl('/login');
                }
                if (environment.production && error.status === 500) {
                  this.alert.error('Rất tiếc! Hệ thống đã bị lỗi. Xin vui lòng liên hệ bộ phận kỹ thuật.');
                  return;
                }
              }
            }
        )
    );
  }
}
