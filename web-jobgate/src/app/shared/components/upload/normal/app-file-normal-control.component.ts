import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileStatusEnum} from '../../../../core/enum/file-status.enum';
import {FileConfigModel} from '../../../../data/data-components/file-config.model';
import {AppValidation} from '../../../utils/app-validation';

@Component({
  selector: 'app-file-normal-control',
  templateUrl: './app-file-normal-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppFileNormalControlComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFileNormalControlComponent implements DoCheck, AfterViewInit, ControlValueAccessor {

  @Input() config: FileConfigModel = new FileConfigModel();
  @Input() label = 'File input';
  @Input() placeholder = 'Choose file';

  @Output() changeEvent: EventEmitter<File[]> = new EventEmitter<File[]>();

  public errorMsg = '';
  public valueV: File[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private appValidation: AppValidation
  ) {
  }

  // Placeholders for the callbacks which are later providesd

  get value(): any {
    return this.valueV;
  }

  @Input()
  set value(v) {
    if (v !== this.valueV) {
      this.valueV = v;
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.valueV) {
      this.valueV = value;
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
  }

  ngDoCheck() {
    this.changeDetector.detectChanges();
  }

  public onChangeEvent(files: FileList): void {
    this.errorMsg = '';

    if (!files.length) {
      return;
    }

    const filesArray = Array.from(files);
    const selectedFiles = this.appValidation.validateFiles(filesArray, this.config);

    if (selectedFiles.status !== FileStatusEnum.STATUS_SUCCESS) {
      this.throwError(selectedFiles.status);
      return;
    }

    this.valueV = selectedFiles.files;
    this.onChangeCallback(selectedFiles.files);
    this.changeEvent.emit(selectedFiles.files);
  }

  public fileName(): string {
    if (!this.valueV || this.valueV.length === 0) {
      return this.placeholder;
    }
    if (this.valueV.length === 1) {
      return this.valueV[0].name;
    }

    return this.valueV.length + ' files';
  }

  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {
  };

  private onChangeCallback: (_: any) => void = () => {
  };

  private throwError(type: FileStatusEnum) {
    switch (type) {
      case FileStatusEnum.STATUS_MAX_FILES_COUNT_EXCEED:
        this.errorMsg = 'Max file count exceed';
        break;
      case FileStatusEnum.STATUS_MAX_FILE_SIZE_EXCEED:
        this.errorMsg = 'Max file size exceed';
        break;
      case FileStatusEnum.STATUS_MAX_FILES_TOTAL_SIZE_EXCEED:
        this.errorMsg = 'Max file total size exceed';
        break;
      case FileStatusEnum.STATUS_NOT_MATCH_EXTENSIONS:
        this.errorMsg = 'Not match extension';
        break;
    }
  }
}
