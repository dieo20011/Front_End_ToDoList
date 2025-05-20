import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ReadMoreComponent } from '../../../shared/ui/read-more/read-more.component';
import { HolidayAddOrUpdateComponent } from './holiday-add-or-update/holiday-add-or-update.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PopUpConfirmComponent } from '../../../shared/ui/pop-up-confirm/pop-up-confirm.component';
import { NzTableDefaultSettingDirective } from '../../../shared/directive/nz-table-default-setting.directive';
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
    NzInputModule,
    NzIconModule,
    NzTableDefaultSettingDirective,
    ReadMoreComponent
],
  templateUrl: './holiday.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HolidayService],
  styleUrl: './holiday.component.scss',
})
export class HolidayComponent implements OnInit {
  tokenDetails: any;
  dataSource: IHoliday[] = [];
  keyword: string = '';
  tableConfig = {
    pageIndex: 1,
    pageSize: 10,
    totalRecords: 0,
  }
  pageSizeOptions = [10, 15, 20];

  constructor(
    private readonly holidayService: HolidayService,
    private readonly _tokenSvc: TokenDecodeService,
    private readonly _notification: NzNotificationService,
    private readonly _cdr: ChangeDetectorRef,
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
      const request = {
        keyword: this.keyword ?? '',
        pageIndex: this.tableConfig.pageIndex,
        pageSize: this.tableConfig.pageSize,
      }
      this.holidayService
        .getAllHolidayData(this.tokenDetails?.userId, request)
        .subscribe({
          next: (resp) => {
            if (resp.status) {
              this.dataSource = resp.data.items;
              this.tableConfig.totalRecords = resp.data.totalRecord;
            }
          },
          error: (error) => {
            this._notification.error('Error when getting data', '');
          },
          complete: () => {
            this._cdr.detectChanges();
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
      this._notification.success('Create holiday successfully', '');
      this.getHolidayData();
    });
  }

  public openEditTask(data: IHoliday) {
    const modalRef = this._nzModalSvc.create({
      nzContent: HolidayAddOrUpdateComponent,
      nzWidth: 700,
      nzData: { data: data, userId: this.tokenDetails?.userId },
      nzMaskClosable: false,
      nzFooter: null,
    });
    modalRef.afterClose.subscribe((reload: boolean) => {
      if (!reload) return;
      this._notification.success('Update holiday successfully', '');
      this.getHolidayData();
    });
  }

  public deleteTask(id: number, event: Event) {
    event.stopPropagation();
    const modalRef = this._nzModalSvc.create({
      nzContent: PopUpConfirmComponent,
      nzWidth: 320,
      nzData: { title: `Are you sure you want to delete?` },
      nzFooter: null,
    });
    modalRef.componentInstance!.clickSubmit.subscribe(() => {
      this.holidayService.deleteHoliday(this.tokenDetails?.userId, id).subscribe((resp) => {
        if (resp.status) {
          modalRef.destroy();
          this._notification.success('Delete holiday successfully', '');
          this.getHolidayData();
        }
      });
    });
  }

  public onChangePageIndex(pageIndex: number) {
    this.tableConfig.pageIndex = pageIndex;
    this.getHolidayData();
  }

  public onPageSizeChange(pageSize: number) {
    const maxPageIndex = Math.ceil(this.tableConfig.totalRecords / pageSize);
    this.tableConfig.pageSize = pageSize;
    if (this.tableConfig.pageIndex <= maxPageIndex) {
      this.getHolidayData();
    }
  }

  public onChangeAnnualHoliday(holiday: IHoliday, event: Event) {
    event.stopPropagation();
    holiday.isAnnualHoliday = !holiday.isAnnualHoliday;
    this.holidayService.updateAnnualHoliday(this.tokenDetails?.userId, holiday.id, holiday.isAnnualHoliday).subscribe((resp) => {
      if (resp.status) {
        this._notification.success('Update holiday successfully', '');
        this.getHolidayData();
      }
    });
  }
}
