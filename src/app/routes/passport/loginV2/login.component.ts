import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { finalize } from 'rxjs';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginV2Component implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  // #region fields

  form = this.fb.nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
    captcha: ['', [Validators.required]],
    remember: [true]
  });
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;
  interval$: any;

  submit(): void {
    this.error = '';

    const { userName, password } = this.form.controls;
    userName.markAsDirty();
    userName.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    if (userName.invalid || password.invalid) {
      return;
    }

    const data = this.form.value;
    const genericRequest = {
      UserId: 0,
      Params: data
    };

    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post(
        `${environment.apiRestBasePath}/login`,
        genericRequest,
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        res = JSON.parse(res);
        if (res.msg !== 'ok') {
          this.error = res.msg;
          this.cdr.detectChanges();
          return;
        }
        this.reuseTabService.clear();
        // 设置用户Token信息
        // TODO: Mock expired value
        res.user.time = +new Date()
        res.user.expired = +new Date() + 1000 * 60 * 5;
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }
  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
