import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true
    }
  ]
})
export class InputMaskComponent implements AfterViewInit {

  @Input() mask: string;
  @Input() placeholder = '';
  @Input() classes = 'form-control';
  @Input() showMaskOnHover = true;
  @Input() showMaskOnFocus = true;
  @Input() autoUnmask = false;
  @Input() inputGroupAppend = false;
  @Input() moreConfig = {};
  @Output() changeEvent = new EventEmitter<any>();
  public valueV = '';
  private elementRef: any;
  private options: any;

  constructor(
    private root: ElementRef
  ) {
  }

  // Placeholders for the callbacks which are later providesd

  get value(): any {
    const val = this.valueV || '';
    return val;
  }

  @Input()
  set value(v) {
    if (v !== this.valueV) {
      this.valueV = v || '';
      this.initUI();
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.valueV) {
      this.valueV = value;
      this.initUI();
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

  ngAfterViewInit(): void {
    this.initUI();
  }

  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = () => {
  };

  private initUI() {
    if (!this.elementRef) {
      this.options = {
        mask: this.mask,
        autoUnmask: this.autoUnmask,
        placeholder: this.placeholder || undefined,
        showMaskOnHover: this.showMaskOnHover,
        showMaskOnFocus: this.showMaskOnFocus,
        onBeforeWrite: (event) => {
          if (event.target?.value != null) {
            this.valueV = event.target?.value;
            this.onChangeCallback(this.valueV);
            this.changeEvent.emit(this.valueV);
          }
        },
        ...this.moreConfig
      };

      this.elementRef = $(this.root.nativeElement.querySelector('input'));
    }
    this.elementRef.inputmask({
      ...this.options
    });
  }

}
