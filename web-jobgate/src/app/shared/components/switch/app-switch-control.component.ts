import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

declare var $: any;

// https://www.jqueryscript.net/form/Customizable-Switch-Button-Plugin-Bootstrap-Switch.html
@Component({
  selector: 'app-switch-control',
  template: `
    <div class="{{wrapCss}}">
      <label *ngIf="!showLeft" class="{{labelCss}}">{{label}}</label>
      <input
        class="{{inputCss}}"
        type="checkbox"
        name="{{name}}"/>
      <label *ngIf="showLeft" class="{{labelCss}}">{{label}}</label>
    </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSwitchControlComponent),
      multi: true
    }
  ]
})
export class AppSwitchControlComponent implements AfterViewInit, ControlValueAccessor {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public size = '';
  @Input() public onColor = 'success';
  @Input() public offColor = 'danger';
  @Input() public offText = 'OFF';
  @Input() public onText = 'ON';
  @Input() public wrapCss = 'd-flex align-items-center';
  @Input() public labelCss = 'nav-link m-0 font-weight-normal';
  @Input() public inputCss = 'custom-control-input form-control-navbar';
  @Input() public showLeft = false;

  @Output() changeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  private elementRf: any = null;
  private valueV = false;

  constructor(
    private root: ElementRef
  ) {
    this.name = root.nativeElement.getAttribute('name');
  }

  get value(): any {
    return this.valueV;
  }

  // Placeholders for the callbacks which are later providesd

  @Input()
  set value(v) {
    if (v !== this.valueV) {
      this.valueV = v;
      this.initUI();
      this.setState();
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.valueV) {
      this.valueV = value;
      this.initUI();
      this.setState();
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngAfterViewInit() {
    this.initUI();
  }

  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = () => {
  };

  private initUI() {
    if (this.elementRf == null) {
      this.elementRf = $(this.root.nativeElement.querySelector('input'));

      this.elementRf.bootstrapSwitch({
        onColor: this.onColor,
        offColor: this.offColor,
        onText: this.onText,
        offText: this.offText,
        size: this.size,
        state: this.valueV
      });

      this.bindEvent();
    }
  }

  private bindEvent() {
    this.elementRf.on('switchChange.bootstrapSwitch', (e, state) => {
      this.changeValue(state);
    });
  }

  private setState() {
    this.elementRf.bootstrapSwitch('state', this.valueV);
  }

  private changeValue(state: boolean) {
    this.valueV = state;

    this.onChangeCallback(this.valueV);
    this.changeEvent.emit(this.valueV);
  }
}
