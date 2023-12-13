import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { CallbackComponent } from './callback.component';
import { UserLockComponent } from './lock/lock.component';
import { UserLoginV2Component } from './loginV2/login.component';
import { PassportRoutingModule } from './passport-routing.module';
import { UserRegisterComponent } from './register/register.component';
import { UserRegisterResultComponent } from './register-result/register-result.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { ValidateComponent } from "./validate.component";
import { ResendVerificationEmailComponent } from './resend-verification-email/resend-verificationemail.component';

const COMPONENTS = [UserLoginV2Component, UserRegisterResultComponent, UserRegisterComponent, UserLockComponent, CallbackComponent, ValidateComponent, ResendVerificationEmailComponent];

@NgModule({
  imports: [SharedModule, PassportRoutingModule, RecaptchaModule],
  declarations: [...COMPONENTS]
})
export class PassportModule { }
