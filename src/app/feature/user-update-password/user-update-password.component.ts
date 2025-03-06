import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthApiService } from '../../../core/service/auth.service';
import { whitespaceValidator } from '../../../shared/util/white-space.validator';

@Component({
  selector: 'app-user-update-password',
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
  templateUrl: './user-update-password.component.html',
  styleUrl: './user-update-password.component.scss',
})
export class UserUpdatePasswordComponent {
  isNewPasswordVisible = true;
  isOldPasswordVisible = true;
  form!: FormGroup;
    constructor(
      private readonly fb: FormBuilder,
      private readonly _nzModalRef: NzModalRef,
      @Inject(NZ_MODAL_DATA)
      public id: string,
      private readonly _authSvc: AuthApiService
    ) {
      this.form = this.fb.group({
        newPassword: ['', [Validators.required, this.passwordValidator()]],
        oldPassword: ['', [Validators.required, whitespaceValidator]],
      });
    }
  
    update() {
      const data = {
        newPassword: this.form.get('newPassword')?.value.trim(),
        oldPassword: this.form.get('oldPassword')?.value.trim()
      };
      this._authSvc.updatePassword(this.id, data).subscribe((resp) => {
        if(resp.status) {
          const reload = true;
          this._nzModalRef.close(reload);
        }
      })
    }

    passwordValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const isValid = hasUpperCase && hasLowerCase && hasDigit && password.length >= minLength;
    
        return isValid ? null : { passwordStrength: true };
      };
    }
    
    onDestroyModal() {
      this._nzModalRef.destroy();
    }
}
