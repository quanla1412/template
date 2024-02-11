import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {AppCommon} from '../../utils/app-common';

declare var $: any;

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './app-modal-wrapper.component.html'
})
export class AppModalWrapperComponent implements AfterViewInit {

  @Input() title = '';
  // modal-sm, modal-lg or modal-xl
  @Input() size = 'modal-lg';
  @Input() appendToBody = false;
  @Input() zIndex = 1040;
  @Input() isFaded = true;
  @Output() hideEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() showEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirmEvent: EventEmitter<any> = new EventEmitter<any>();
  public id = this.common.makeid(8);
  private el: any;

  constructor(
    private root: ElementRef,
    private common: AppCommon
  ) {
  }

  ngAfterViewInit() {
    if (!this.el) {
      this.el = $('#modal_' + this.id);
    }

    this.el.on('shown.bs.modal', (e) => {
      e.stopPropagation();
      if (this.zIndex !== 1040) {
        $('.modal-backdrop.fade.show').last().css('z-index', this.zIndex);
        this.el.css('z-index', this.zIndex + 1);
      }
      this.showEvent.emit();
    });

    this.el.on('hidden.bs.modal', (e) => {
      e.stopPropagation();
      if ($('.modal.show').length) {
        $('body').addClass('modal-open');
      }
      this.hideEvent.emit();
    });
  }

  public hide() {
    this.el.modal('hide');
  }

  public show() {
    this.el.modal('show');
    if (this.appendToBody) {
      this.el.appendTo('body');
    }
  }
}
