import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IHoliday } from './holiday.interface';
import { HolidayService } from './holiday.service';
import { TokenDecodeService } from '../../../core/service/token.service';
import { AuthApiService } from '../../../core/service/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PopUpConfirmComponent } from '../../../shared/ui/pop-up-confirm/pop-up-confirm.component';
import { ReadMoreComponent } from '../../../shared/ui/read-more/read-more.component';
import { HolidayAddOrUpdateComponent } from './holiday-add-or-update/holiday-add-or-update.component';
@Component({
  selector: 'app-holiday',
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzFormModule,
    FormsModule,
    NzTableModule,
  ],
  templateUrl: './holiday.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HolidayService],
  styleUrl: './holiday.component.scss',
})
export class HolidayComponent implements OnInit {
  tokenDetails: any;
  dataSource: IHoliday[] = [];

  constructor(
    private readonly holidayService: HolidayService,
    private readonly _tokenSvc: TokenDecodeService,
    private readonly _notification: NzNotificationService,
    private readonly _nzModalSvc: NzModalService,
    private readonly _authSvc: AuthApiService
  ) {}

  ngOnInit(): void {
    this.getHolidayData();
  }

  public getHolidayData() {
    this.tokenDetails = this._tokenSvc.getTokenDetails(
      this._authSvc.getToken()
    );
    if (this.tokenDetails?.userId) {
      this.holidayService
        .getAllHoLidayData(this.tokenDetails?.userId)
        .subscribe((resp) => {
          if (resp.status) {
            this.dataSource = resp.data;
            console.log(this.dataSource);
          }
        });
    }
  }

  public onAddHoliday() {
    const modalRef = this._nzModalSvc.create({
      nzContent: HolidayAddOrUpdateComponent,
      nzWidth: 700,
      nzData: { userId: this.tokenDetails?.userId },
      nzMaskClosable: false,
      nzFooter: null,
    });
    modalRef.afterClose.subscribe((reload: boolean) => {
      if (!reload) return;
      this._notification.success('Tạo `task` thành công', '');
      this.getHolidayData();
    });
  }

  openEditTask(data: IHoliday) {
    const modalRef = this._nzModalSvc.create({
      nzContent: HolidayAddOrUpdateComponent,
      nzWidth: 700,
      nzData: { data: data, userId: this.tokenDetails?.userId },
      nzMaskClosable: false,
      nzFooter: null,
    });
    modalRef.afterClose.subscribe((reload: boolean) => {
      if (!reload) return;
      this._notification.success('Sửa ngày lễ thành công', '');
      this.getHolidayData();
    });
  }

  deleteTask(id: string, event: Event) {
    event.stopPropagation();
    const modalRef = this._nzModalSvc.create({
      nzContent: PopUpConfirmComponent,
      nzWidth: 320,
      nzData: { title: `Bạn có chắc chắn muốn xóa?` },
      nzFooter: null,
    });
    modalRef.componentInstance!.clickSubmit.subscribe(() => {
      this.holidayService.deleteHoliday(this.tokenDetails?.userId, Number(id)).subscribe((resp) => {
        if (resp.status) {
          modalRef.destroy();
          this._notification.success('Xóa task thành công', '');
          this.getHolidayData();
        }
      });
    });
  }
}
