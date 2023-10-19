import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layout/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { DependecyModule } from './modules/shared/dependecy/dependecy.module';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderRouterModule,
  NgxUiLoaderHttpModule
} from 'ngx-ui-loader';
import { ConfirmationModelComponent } from './lib/confirmation-model/confirmation-model.component';
import { authInterceptorProviders } from './services/Authentications/auth-interceptors.interceptor';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#b7bfaf",
  bgsPosition: POSITION.centerCenter,
  bgsType: SPINNER.ballSpinClockwise,
  fgsType: SPINNER.ballSpinClockwise,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,

  bgsOpacity: 0.5,
  bgsSize: 60,
  delay: 0,
  fgsPosition: POSITION.centerCenter,
  fgsSize: 60,
};

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    HeaderComponent,
    SidenavComponent,
    ConfirmationModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    DependecyModule,
  ],
  providers: [
    authInterceptorProviders,
    // CacheResolverService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
