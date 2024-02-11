import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {FileStatusEnum} from '../../../../core/enum/file-status.enum';
import {FileConfigModel} from '../../../../data/data-components/file-config.model';
import {AppValidation} from '../../../utils/app-validation';

declare var $: any;

@Component({
  selector: 'app-file-drag-drop-control',
  templateUrl: './app-file-drag-drop-control.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFileDragDropControlComponent implements AfterViewInit, DoCheck, AfterViewChecked {
  public errorMsg = '';
  public files = new Array<File>();
  @Input() config: FileConfigModel = new FileConfigModel();
  @Input() label = 'Drag and Drop File Here';
  @Output() changeEvent: EventEmitter<File[]> = new EventEmitter<File[]>();
  private elRef;

  constructor(
    private root: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private appValidation: AppValidation) {
  }

  @HostListener('dragenter', ['$event'])
  public onDragEnter(event: any) {
    this.elRef.addClass('drap');
    this.preventEvent(event);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: any) {
    this.elRef.addClass('drap');
    this.preventEvent(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.preventEvent(event);

    this.elRef.removeClass('drap');
    if (!event.dataTransfer || !event.dataTransfer.files) {
      return;
    }

    this.dropFilesHandler(event.dataTransfer.files);
  }

  ngAfterViewInit() {
    this.elRef = $(this.root.nativeElement.querySelector('.drap-drop-file'));
  }

  ngDoCheck() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewChecked() {
    const self = this;
    this.elRef.parent().find('.drap-drop-remove').on('click', function(e) {
      self.preventEvent(e);
      self.selectFiles(this);
    });
  }

  selectFiles(el?: any) {
    if (!el) {
      this.elRef.parent().find('.drap-drop-file-input').trigger('click');
    } else {
      this.removeFile(el);
    }
  }

  onChange(files: FileList): void {
    if (!files.length) {
      return;
    }

    this.dropFilesHandler(files);
  }

  removeFile(el: any) {
    const parentEl = $(el).parent();
    const name = parentEl.attr('data-file-name');
    const fileNews = new Array<File>();

    for (const item of this.files) {
      if (item.name !== name) {
        fileNews.push(item);
      }
    }
    this.files = fileNews;

    this.removeFileIcon(name);
    this.fireChangeEvent();
  }

  clearFiles() {
    this.files = new Array<File>();
    $('a[data-file-name]').remove();

    this.fireChangeEvent();
  }

  isEmpty() {
    return !this.files || this.files.length === 0;
  }

  private dropFilesHandler(files: FileList) {
    const filesArray = Array.from(files);
    this.addFiles(filesArray);
  }

  private addFiles(files: File[]) {
    const lengthBefore = this.files.length;
    // Add if file name not exist.
    for (const item of files) {
      const fileExits = this.files.filter((file: File) => file.name === item.name);

      if (fileExits.length === 0) {
        this.files.push(item);
        this.addFileIcon(item.name);
      }
    }

    const lengthAfter = this.files.length;
    if (lengthAfter > lengthBefore) {
      this.fireChangeEvent();
    }
  }

  private fireChangeEvent() {
    if (this.validateFiles()) {
      this.errorMsg = '';
      this.changeEvent.emit(this.files);
    } else {
      this.changeEvent.emit([]);
    }
  }

  private validateFiles() {
    const selectedFiles = this.appValidation.validateFiles(this.files, this.config);

    if (selectedFiles.status !== FileStatusEnum.STATUS_SUCCESS) {
      this.throwError(selectedFiles.status);
      return false;
    }

    return true;
  }

  private addFileIcon(fileName: string) {
    const template = `<a class="btn btn-app" data-file-name="${fileName}">
                        <span class="badge bg-gray drap-drop-remove">x</span>
                        <i class="fa fa-edit"></i> ${fileName}
                      </a>`;

    this.elRef.append(template);
  }

  private removeFileIcon(fileName: string) {
    $(`a[data-file-name="${fileName}"]`).remove();
  }

  private preventEvent(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

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
