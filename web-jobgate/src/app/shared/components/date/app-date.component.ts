import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-date',
  templateUrl: './app-date.component.html',
})
export class AppDateComponent implements AfterViewInit {
  @Input() id = '';
  @Input() label = '';
  @Input() dataPlaceHolder = '';
  @Input() required = false;

  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private root: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
      $('#' + this.id).datepicker();
  }

}
