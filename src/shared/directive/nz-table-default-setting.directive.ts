import { Directive } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';

@Directive({
  selector: '[appNzTableDefaultSetting]',
  standalone: true,
})
export class NzTableDefaultSettingDirective {
  constructor(private readonly _nzTable: NzTableComponent<unknown>) {
    _nzTable.nzPageSizeOptions = [10, 25, 50, 100];
    _nzTable.nzShowSizeChanger = true;
    _nzTable.nzPaginationPosition = 'both';
    _nzTable.nzOuterBordered = true;
    _nzTable.nzBordered = true;
    _nzTable.nzShowPagination = true;
  }
}
