import {EventEmitter, Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class AppModals {
  private TEMPLATE = `<div class="modal fade"  id ="{{id}}" >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button class="btn-close" data-dismiss="modal" >
                      <i class="fa-solid"></i>
                    </button>
                  </div>
                  <div class="modal-body"></div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-danger light" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-sm btn-primary" >Xác nhận</button>
                  </div>
                </div>
              </div>
            </div>`;

  private confirmEvent: EventEmitter<boolean>;

  private currentPopupEl: any;
  private isConfirmPopup: boolean;
  private confirmVal: boolean;

  info(message: string, title: string = 'Info') {
    this.showPopup('bg-info', title, message);
  }

  warn(message: string, title: string = 'Warn') {
    this.showPopup('bg-warning', title, message);
  }

  error(message: string, title: string = 'Error') {
    this.showPopup('bg-danger', title, message);
  }

  success(message: string, title: string = 'Success') {
    this.showPopup('bg-success', title, message);
  }

  confirm(message: string, title: string = 'Confirm'): EventEmitter<boolean> {
    this.showPopup('bg-confirm', title, message, true);
    this.confirmEvent = new EventEmitter<boolean>();
    this.confirmVal = false;
    return this.confirmEvent;
  }

  private showPopup(cssClass: string, title: string, message: string, isConfirm: boolean = false) {
    this.isConfirmPopup = isConfirm;
    this.initPopup(cssClass, title, message);
    this.bindEvent();
  }

  private initPopup(cssClass: string, title: string, message: string) {
    const btnClass = this.isConfirmPopup ? 'btn-default' : 'btn-outline-light';
    const id = 'app_modal_' + new Date().getTime();
    const template = this.TEMPLATE.replace('{{classType}}', cssClass)
      .replace('{{id}}', id)
      .replace('{{title}}', title)
      .replace('{{btnClass}}', btnClass);

    $('body').append(template);
    this.currentPopupEl = $('#' + id);
    this.currentPopupEl.find('.modal-body').html(message);
    if (this.isConfirmPopup) {
      this.currentPopupEl.find('.btn.btn-primary').show();
    }

    this.currentPopupEl.modal('show');
    $('.modal-backdrop.fade.show').last().css('z-index', 1051);
  }

  private bindEvent() {
    // Bind all event when hiding modal
    this.currentPopupEl.on('hide.bs.modal', (e) => {
      e.stopPropagation();
      this.currentPopupEl.remove();
      if (this.isConfirmPopup) {
        this.confirmEvent.emit(this.confirmVal);
      }
    });

    this.currentPopupEl.on('hidden.bs.modal', (e) => {
      e.stopPropagation();
      if ($('.modal.show').length) {
        $('body').addClass('modal-open');
      }
    });

    this.currentPopupEl.find('.btn.btn-primary').on('click', () => {
      this.confirmVal = true;
      this.currentPopupEl.modal('hide');
    });
  }
}
