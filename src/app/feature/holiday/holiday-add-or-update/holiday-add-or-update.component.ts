import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { HolidayService } from '../holiday.service';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { whitespaceValidator } from '../../../../shared/util/white-space.validator';
import { IHoliday } from '../holiday.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DateValidatorV2 } from '../../../../shared/util/date.validator';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
@Component({
  selector: 'app-holiday-add-or-update',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    // NgModule
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzDatePickerModule,
    NzCheckboxModule,
  ],
  providers: [HolidayService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './holiday-add-or-update.component.html',
  styleUrl: './holiday-add-or-update.component.scss'
})
export class HolidayAddOrUpdateComponent {
  form: UntypedFormGroup;
  constructor(
    private readonly _fb: UntypedFormBuilder,
    private readonly _nzModalRef: NzModalRef,
    private readonly datePipe: DatePipe,
    private readonly _holdaidayApiSvc: HolidayService,
    @Inject(NZ_MODAL_DATA)
    public data: { data: IHoliday, userId: number }
  ) {
    this.form = this._fb.group({
      name: new FormControl('', [
        whitespaceValidator,
        Validators.required,
        Validators.maxLength(50),
      ]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      isAnnualHoliday: new FormControl(false),
      description: new FormControl('', [Validators.required, whitespaceValidator]),
    },
    {
      validators: [DateValidatorV2.dateRange('fromDate', 'toDate')]
    }
  );
  }

  ngOnInit(): void {
    if (this.data?.data) {
      this.form.patchValue(this.data.data);
    }
  }

  formatDate(date: string): string {
    return (
      this.datePipe.transform(date, "yyyy-MM-dd'T'00:00:00'Z'", 'UTC') ?? ''
    );
  }

  create() {
    const data = {
      ...this.form.value,
      fromDate: this.formatDate(this.form.get('fromDate')?.value),
      toDate: this.formatDate(this.form.get('toDate')?.value),
      userId: this.data.userId ?? '',
    };
    if (!this.data?.data) {
      this._holdaidayApiSvc.newHoliday(data).subscribe((resp) => {
        if (resp.status) {
          const reload = true;
          this._nzModalRef.close(reload);
        }
      });
    } else {
      this._holdaidayApiSvc.updateHoliday(this.data?.data.id, data).subscribe((resp) => {
        if (resp.status) {
          const reload = true;
          this._nzModalRef.close(reload);
        }
      });
    }
  }

  onDestroyModal() {
    this._nzModalRef.destroy();
  }
}
