import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DependecyModule } from '../shared/dependecy/dependecy.module';
import { CorehelperComponent } from './corehelper/corehelper.component';
import { NgxOtpInputModule } from "ngx-otp-input";


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    CorehelperComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgxCaptchaModule,
    NgxOtpInputModule,
    DependecyModule,
  ]
})
export class CoreModule { }
