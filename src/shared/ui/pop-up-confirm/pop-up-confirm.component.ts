import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
export interface ConfirmDialogData {
  title: string;
  content: string;
  lists: string[];
}
@Component({
  selector: 'app-pop-up-confirm',
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    TranslateModule,
    NzPopconfirmModule,
    NzModalModule,
    NzFormModule,
    NgForOf,
  ],
  templateUrl: './pop-up-confirm.component.html',
  styleUrl: './pop-up-confirm.component.scss',
})
export class PopUpConfirmComponent {
  @Output() clickSubmit = new EventEmitter<void>();
  @Output() clickCancel = new EventEmitter<void>();
  constructor(
    private _nzModalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: ConfirmDialogData
  ) {}
  onSubmit() {
    this.clickSubmit.emit();
  }
  onDestroyModal() {
    this.clickCancel.emit();
    this._nzModalRef.destroy();
  }
}
