import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { whitespaceValidator } from '../../../shared/util/white-space.validator';
import { AuthApiService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signupForm!: FormGroup;
  usernameFocused = false;
  emailFocused = false;
  passwordFocused = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly _authSvc: AuthApiService,
    private readonly router: Router,
    private readonly _notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', [Validators.required, whitespaceValidator]],
      username: ['', [Validators.required, whitespaceValidator]],
      password: ['', [Validators.required]],
    });
  }

  signup() {
    const data = {
      fullname: this.signupForm.get('fullname')?.value,
      username: this.signupForm.get('username')?.value,
      password: this.signupForm.get('password')?.value,
    };
    this._authSvc.signup(data).subscribe({
      next: (resp) => {
        if(resp.status) {
          this._authSvc.setToken(resp.message);
          this.router.navigateByUrl('/dashboard');
          this._notification.success('Sign up success !!! Welcome', '');
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

  onFocusUsername(): void {
    this.usernameFocused = true;
  }

  onBlurUsername(): void {
    this.usernameFocused = false;
  }

  removeLeadingWhitespace(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/^\s+/, '');
  }
}
