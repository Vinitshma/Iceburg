import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { ComonComponent } from './comon/comon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ComonComponent
  ],
  imports: [
    CommonModule,
    DashboardComponent,
    MainRoutingModule
  ],
  providers: [
    BsModalService
  ],
})
export class MainModule { }
