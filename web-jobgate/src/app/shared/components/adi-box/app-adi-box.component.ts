import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-adi-box',
    templateUrl: './app-adi-box.component.html'
})
export class AppAdiBoxComponent {
    @Input() public title = '';
    @Input() public backgroundColor = 'bg-secondary';
    @Input() public icon = 'fa-user';
    @Input() public classAppend = '';
    @Input() public isFluidHeight = false;

    @Output() clickEvent: EventEmitter<any> = new EventEmitter<any>();
}
