import { Component, OnInit } from '@angular/core';
import { AuthApiService } from '../../../core/service/auth.service';
import { TokenDecodeService } from '../../../core/service/token.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import {
  NzDropDownDirective,
  NzDropdownMenuComponent,
} from 'ng-zorro-antd/dropdown';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserUpdateInfoComponent } from '../user-update-info/user-update-info.component';

@Component({
  selector: 'app-header',
  imports: [
    NzIconModule,
    NzMenuModule,
    CommonModule,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzModalModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  tokenDetails: any;
  constructor(
    private readonly _tokenSvc: TokenDecodeService,
    private readonly _notification: NzNotificationService,
    private readonly router: Router,
    private readonly _nzModalSvc: NzModalService,
    private readonly _authSvc: AuthApiService
  ) {}
  ngOnInit(): void {
    this.tokenDetails = this._tokenSvc.getTokenDetails(
      this._authSvc.getToken()
    );
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
      this._notification.success('Cập nhật thông tin thành công', '');
      this.tokenDetails = this._tokenSvc.getTokenDetails(
        this._authSvc.getToken()
      );
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
