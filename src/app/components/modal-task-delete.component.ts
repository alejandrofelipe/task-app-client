import {IModalDialog, IModalDialogButton, IModalDialogOptions} from 'ngx-modal-dialog';
import {Component, ComponentRef} from '@angular/core';

@Component({
  template: ``
})
export class ModalTaskDeleteComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];
  loading = false;
  btnClose: IModalDialogButton;
  btnAction: IModalDialogButton;


  constructor() {
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>): void {
    this.btnClose = {
      text: 'Close',
      buttonClass: 'btn btn-light ' + (this.loading ? 'disabled' : ''),
      onAction: () => true
    };
    this.btnAction = {
      text: 'Delete',
      buttonClass: 'btn btn-danger',
      onAction: () => {
        this.startLoading();
        this.loading = true;
      }
    };
  }

  private startLoading(): void {
    this.btnClose.buttonClass = 'btn btn-light disabled';
  }
}
