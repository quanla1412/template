import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {AppModalWrapperComponent} from '../modal-wrapper/app-modal-wrapper.component';
import {environment} from '../../../../environments/environment';

declare var Quagga: any;
const barcodeReader = environment.barcodeReader;
const barcodeFormat = environment.barcodeFormat;

@Component({
  selector: 'app-app-barcode-scanner',
  templateUrl: './app-scan-barcode.component.html'
})
export class AppScanBarcodeComponent implements AfterViewInit {
  @ViewChild('scanBarcodeModalWrapper', {static: true}) scanBarcodeModal: AppModalWrapperComponent;
  @Output() scanEvent: EventEmitter<string> = new EventEmitter<string>();
  public barcode: string;

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  public show() {
    this.scanBarcodeModal.show();
    this.init();
  }

  public hide() {
    this.scanBarcodeModal.hide();
  }

  public closeEvent() {
    this.reset();
  }

  public save() {
    this.scanEvent.emit(this.barcode);
    this.hide();
  }

  private init() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        constraints: {
          width: '640',
          height: '480'
        },
        numberOfWorkers: navigator.hardwareConcurrency,
        target: document.querySelector('.adi-barcode-camera')
      },
      locate: true,
      decoder: {
        readers: [barcodeReader]
      }
    }, (err) => {
      if (err) {
        return;
      }
      Quagga.start();
    });

    // Check error and save barcode
    Quagga.onDetected((result) => {
      if (result.codeResult.format === barcodeFormat) {
        const err = this.getMedianOfCodeErrors(result.codeResult.decodedCodes);
        // if Quagga is at least 75% certain that it read correctly, then accept the code.
        if (err < 0.25) {
          this.barcode = result.codeResult.code;
        }
      }
    });

    // Draw detection
    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;
      drawingCtx.font = '24px Arial';
      drawingCtx.fillStyle = 'green';

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
          result.boxes.filter((box) => box !== result.box).forEach((box) => {
            Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: 'purple', lineWidth: 2});
          });
        }
        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: 'blue', lineWidth: 2});
        }
        if (result.codeResult && result.codeResult.code) {
          drawingCtx.font = '24px Arial';
          drawingCtx.fillText(result.codeResult.code, 10, 20);
        }
      }
    });
  }

  private getMedian(arr) {
    arr.sort((a, b) => a - b);
    const half = Math.floor(arr.length / 2);
    if (arr.length % 2 === 1) {
      return arr[half];
    }
    return (arr[half - 1] + arr[half]) / 2;
  }

  private getMedianOfCodeErrors(decodedCodes) {
    const errors = decodedCodes.filter(x => x.error !== undefined).map(x => x.error);
    const medianOfErrors = this.getMedian(errors);
    return medianOfErrors;
  }

  private reset() {
    Quagga.stop();
    this.barcode = '';
  }
}
