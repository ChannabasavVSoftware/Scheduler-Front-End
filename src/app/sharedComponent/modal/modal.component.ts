import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.less'
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() modalClass: string = 'default-modal';
  @Input() width: string = '520px';
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  handleOk(): void {
    this.isVisibleChange.emit(false);
  }

  handleCancel(): void {
    this.isVisibleChange.emit(false);
  }
}
