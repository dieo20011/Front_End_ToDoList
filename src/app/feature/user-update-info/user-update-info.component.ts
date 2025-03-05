import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthApiService } from '../../../core/service/auth.service';
import { whitespaceValidator } from '../../../shared/util/white-space.validator';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-user-update-info',
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
  ],
  templateUrl: './user-update-info.component.html',
  styleUrl: './user-update-info.component.scss',
})
export class UserUpdateInfoComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly _nzModalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA)
    public id: string,
    private readonly _authSvc: AuthApiService
  ) {
    this.form = this.fb.group({
      fullname: ['', [Validators.required, whitespaceValidator]],
      username: ['', [Validators.required, whitespaceValidator]],
    });
  }
  ngOnInit(): void {
    this._authSvc.getMe(this.id).subscribe((resp) => {
      if(resp.status) {
        this.form.patchValue(resp.data);
      }
    });
  }
  submit() {
   
  }

  update() {

  }
  
  onDestroyModal() {
    this._nzModalRef.destroy();
  }
}
