import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { RcommonComponent } from './rcommon/rcommon.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './shared/components/user/user.component';
import { AdminFormComponent } from './shared/components/admin-form/admin-form.component';
import { ConfirmationModalService } from 'src/app/lib/services/confirmatiom-model.service';


@NgModule({
  declarations: [
    ProfileComponent,
    RcommonComponent,
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserComponent,
    AdminFormComponent
  ],
 providers: [
    ConfirmationModalService
  ],
})
export class UserModule { }
