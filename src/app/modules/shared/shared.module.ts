import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TextOnlyDirective } from './directives/text-only.directive';
import { NumberonlyDirective } from './directives/numberonly.directive';
import { SearchPipe } from './Pipes/search.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import { NodataComponent } from './Components/nodata/nodata.component';
import { ConfirmationModalService } from 'src/app/lib/services/confirmatiom-model.service';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { GcmNotificationComponent } from './Components/gcm-notification/gcm-notification.component';


@NgModule({
  declarations: [
    TextOnlyDirective,
    NumberonlyDirective,
    SearchPipe,
    SortPipe,
    NodataComponent,
    // GcmNotificationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[
    TextOnlyDirective,
    NumberonlyDirective
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    BsModalService,
    ConfirmationModalService
  ],
})
export class SharedModule { }
