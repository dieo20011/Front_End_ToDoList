import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { AuthApiService } from '../../../core/service/auth.service';
import { TokenDecodeService } from '../../../core/service/token.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserUpdateInfoComponent } from '../user-update-info/user-update-info.component';
import { UserUpdatePasswordComponent } from '../user-update-password/user-update-password.component';
import { NzTabComponent, NzTabLinkDirective, NzTabsModule } from 'ng-zorro-antd/tabs';
@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    NzMenuModule,
    CommonModule,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzModalModule,
    NzTabsModule,
    RouterLink,
    NzTabLinkDirective,
    NzTabComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  tokenDetails: any;
  userName = signal('');
  isAdmin = signal(false);
  selectedIndex = signal(0);
  loading = signal(false);
  constructor(
    private readonly _tokenSvc: TokenDecodeService,
    private readonly _notification: NzNotificationService,
    private readonly router: Router,
    private readonly _nzModalSvc: NzModalService,
    private readonly _authSvc: AuthApiService,
    private readonly _cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getMe();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.includes('/dashboard/calendar-self')) {
          this.selectedIndex.set(0);
        } else if (this.router.url.includes('/dashboard/holiday')) {
          this.selectedIndex.set(1);
        }
      }
    });
  }

  getMe() {
    this.tokenDetails = this._tokenSvc.getTokenDetails(
      this._authSvc.getToken()
    );
    this.loading.set(true);
    if(this.tokenDetails?.userId) {
      this._authSvc.getMe(this.tokenDetails?.userId).subscribe({
        next: (resp) => {
          if(resp.status) {
            this.userName.set(resp.data.fullname);
            if(resp.data.email === "phamduyluan102001@gmail.com") {
              this.isAdmin.set(true);
            }
          }
        },
        error: (error) => {
          this._notification.error('Error when getting data', '');
        },
        complete: () => {
          this.loading.set(false);
          this._cdr.detectChanges();
        }
      })
    }
  }

  openPopUpEditInformation() {
    const modalRef = this._nzModalSvc.create({
      nzContent: UserUpdateInfoComponent,
      nzWidth: 700,
      nzData: this.tokenDetails ? this.tokenDetails?.userId: '',
      nzMaskClosable: false,
      nzFooter: null,
    });
    modalRef.afterClose.subscribe((reload: boolean) => {
      if (!reload) return;
      this._notification.success('Update information successfully', '');
      this.getMe();
    });
  }

  openPopUpChangePassword() {
    const modalRef = this._nzModalSvc.create({
      nzContent: UserUpdatePasswordComponent,
      nzWidth: 700,
      nzData: this.tokenDetails ? this.tokenDetails?.userId: '',
      nzMaskClosable: false,
      nzFooter: null,
    });
    modalRef.afterClose.subscribe((reload: boolean) => {
      if (!reload) return;
      this._notification.success('Update password successfully', '');
      this.getMe();
    });
  }

  getPartOfDate(): { greeting: string; icon: string } {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return { greeting: 'Good morning', icon: '🌅' };
    } else if (currentHour >= 12 && currentHour < 18) {
      return { greeting: 'Good afternoon', icon: '🌞' };
    } else {
      return { greeting: 'Good night', icon: '🌙' };
    }
  }

  logOut() {
    this._authSvc.logout();
    if (!this._authSvc.getToken()) {
      this.router.navigateByUrl('/login');
      this._notification.success('Sign out success !!!', '');
    }
  }
}
