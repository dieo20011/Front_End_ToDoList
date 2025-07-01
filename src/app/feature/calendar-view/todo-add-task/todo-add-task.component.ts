import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {
  CalendarRespone,
  ToDoList,
  ToDoStatus,
} from '../calendar-view.interface';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { whitespaceValidator } from '../../../../shared/util/white-space.validator';
import { removeAccentedChars } from '../../../../shared/util/string-helpers';
import { TodoTaskApiService } from './todo-add-task.service';
import { DateValidatorV2 } from '../../../../shared/util/date.validator';

@Component({
  selector: 'app-todo-add-task',
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
  ],
  providers: [TodoTaskApiService, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-add-task.component.html',
  styleUrl: './todo-add-task.component.scss',
})
export class TodoAddTaskComponent implements OnInit {
  form: UntypedFormGroup;
  todoList = ToDoList;
  todoListCopy = ToDoList;
  constructor(
    private readonly _fb: UntypedFormBuilder,
    private readonly _nzModalRef: NzModalRef,
    private readonly datePipe: DatePipe,
    private readonly _todoApiSvc: TodoTaskApiService,
    @Inject(NZ_MODAL_DATA)
    public data: { data: CalendarRespone, userId: number }
  ) {
    this.form = this._fb.group({
      title: new FormControl('', [
        whitespaceValidator,
        Validators.required,
        Validators.maxLength(50),
      ]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl(''),
      status: new FormControl(ToDoStatus.Pending, [Validators.required]),
      description: new FormControl('', [Validators.required, whitespaceValidator]),
    }
  );
  }

  ngOnInit(): void {
    const today = new Date();
    if (this.data?.data) {
      this.form.patchValue(this.data.data);
    } else {
      this.form.get('fromDate')?.patchValue(today);
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
      toDate: this.formatDate(this.form.get('fromDate')?.value),
      userId: this.data.userId ?? '',
    };
    if (!this.data?.data) {
      this._todoApiSvc.newTask(data).subscribe((resp) => {
        if (resp.status) {
          const reload = true;
          this._nzModalRef.close(reload);
        }
      });
    } else {
      this._todoApiSvc.updateTask(this.data?.data.id, data).subscribe((resp) => {
        if (resp.status) {
          const reload = true;
          this._nzModalRef.close(reload);
        }
      });
    }
  }

  search(event: any) {
    if (event) {
      this.todoList = this.todoListCopy.filter((rv) =>
        removeAccentedChars(rv.label)
          .toLowerCase()
          .includes(removeAccentedChars(event).toLowerCase())
      );
    } else {
      this.todoList = this.todoListCopy;
    }
  }

  filterDropDownList(input: string): boolean {
    if (removeAccentedChars(input)) {
      return true;
    }
    return false;
  }

  onDestroyModal() {
    this._nzModalRef.destroy();
  }
}
