import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, RouterLink } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthApiService } from '../../../core/service/auth.service';
import { whitespaceValidator } from '../../../shared/util/white-space.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    NzFormModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  emailFocused = false;
  passwordFocused = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly _authSvc: AuthApiService,
    private readonly router: Router,
    private readonly _notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, whitespaceValidator]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    const data = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this._authSvc.login(data).subscribe({
      next: (resp) => {
        if(resp.status) {
          this._authSvc.setToken(resp.message);
          this.router.navigateByUrl('/dashboard');
          this._notification.success('Sign in success !!! Welcome', '');
        }
      },
      complete: () => {
        
      }
    })
  }

  onFocusEmail(): void {
    this.emailFocused = true;
  }

  onBlurEmail(): void {
    this.emailFocused = false;
  }

  onFocusPassword(): void {
    this.passwordFocused = true;
  }

  onBlurPassword(): void {
    this.passwordFocused = false;
  }
}
