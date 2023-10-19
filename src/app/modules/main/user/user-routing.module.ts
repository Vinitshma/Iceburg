import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RcommonComponent } from './rcommon/rcommon.component';

const routes: Routes = [
  {path:'', redirectTo:'profile', pathMatch:'full'},
  {path:'profile', component:ProfileComponent, data: { breadcrumb: 'Profile' }},
  {path:'user-manage', component:RcommonComponent, data: { breadcrumb: 'Manage People' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
