import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginV2Component } from './loginV2/login.component';
import { UserRegisterComponent } from './register/register.component';
import { UserRegisterResultComponent } from './register-result/register-result.component';
import { LayoutPassportComponent } from '../../layout/passport/passport.component';
import { ValidateComponent } from './validate.component';

const routes: Routes = [
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginV2Component,
        data: { title: '登录', titleI18n: 'app.login.login' }
      },
      {
        path: 'validate',
        component: ValidateComponent,
        data: { title: '登录', titleI18n: 'app.validate.account' }
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: 'Registrarse', titleI18n: 'app.register.register' }
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: 'resultados de registro', titleI18n: 'app.register.register' }
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' }
      }
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
