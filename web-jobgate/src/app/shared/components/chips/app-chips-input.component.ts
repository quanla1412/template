import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import '@material-design-icons/font';
import {Select2ControlModel} from '../../../data/data-components/select2-control.model';
import {AppAlert} from '../../utils';
import {ControlValueAccessor} from '@angular/forms';

export interface Item {
  value: string;
}

/**
 * @title Chips with input
 */
@Component({
  selector: 'app-chips-input',
  templateUrl: 'app-chips-input.component.html',
  styleUrls: ['app-chips-input.component.css'],
})
export class AppChipsInputComponent implements ControlValueAccessor {
  @Input() dataPlaceHolder = '';
  @Input() required = false;
  @Input() id: string;
  @Input() label = '';
  @Input() data: string[] = [];

  @Output() changeEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
      private appAlert: AppAlert
  ) {
    console.log(this.data);
  }

  writeValue(obj: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    // Add new value
    if (value) {
      if (this.data.find(item => item === value) != null) {
        this.appAlert.error('Từ khóa đã tồn tại');
      } else {
        this.data.push(value);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.changeEvent.emit(this.data);
  }

  remove(item: string): void {
    const index = this.data.indexOf(item);

    if (index >= 0) {
      this.data.splice(index, 1);
    }
  }
}
