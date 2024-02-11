import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, TemplateRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AppGuid} from '../../utils';

declare var $: any;

@Component({
  selector: 'app-select2-async',
  template: `
    <select id="{{id}}" class="select2 {{classAppend}}" style="width: 100%">
      <option value="0" selected="selected" [disabled]="isDefaultDisabled">{{valueDefault}}</option>
      <ng-container *ngTemplateOutlet="optionTemplate; context: {dataList: dataList}"></ng-container>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelect2AsyncComponent),
      multi: true
    }
  ]
})

export class AppSelect2AsyncComponent implements AfterViewInit, ControlValueAccessor {
  @Input() id = this.guid.new();
  @Input() dataPlaceHolder = '';
  @Input() classAppend = '';
  @Input() dataList: any[] = [];
  @Input() valueDefault = 'Select your option!';
  @Input() optionTemplate: TemplateRef<any>;
  @Input() isDefaultDisabled = false;
  @Input() selectDuplicate = false;
  @Output()
  public changeEvent = new EventEmitter<number>();
  private elementRf: any = null;

  constructor(
    private root: ElementRef,
    private guid: AppGuid
  ) {
  }

  private _value = 0;

  @Input()
  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
  }

  ngAfterViewInit(): void {
    this.elementRf = $('#' + this.id);
    this.elementRf.attr('data-placeholder', this.dataPlaceHolder);

    this.elementRf.select2({
      dropdownAutoWidth: true
    });
    this.elementRf.val(this.value);
    this.elementRf.trigger('change');

    if (this.selectDuplicate) {
      this.elementRf.on('select2:open', (e) => {
        this.elementRf.val(0);
        this.elementRf.trigger('change');
      });

      this.elementRf.on('select2:close', (e) => {
        this.elementRf.val(this.value);
        this.elementRf.trigger('change');
      });
    }

    this.elementRf.on('select2:select', (e) => {
      this.onSelect(e);
      this.elementRf.trigger('select2:unselect');
    });
  }

  public closeSelect2(): void {
    this.elementRf.trigger('select2:close');
  }

  writeValue(val: any): void {
    this.value = val;
    if (this.elementRf != null) {
      this.elementRf.val(this.value);
      this.elementRf.trigger('change');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  private onTouched = () => {
  };

  private onChange = (v: number) => {
  };

  private onSelect(e: any) {
    this.value = +e.params.data.id;
    this.onChange(this.value);
    this.changeEvent.emit(this.value);
  }

}
