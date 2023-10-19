import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComonComponent } from './comon/comon.component';

const routes: Routes = [
  {
    path:'', component:ComonComponent,
    children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full', data: { breadcrumb: 'Dashboard' }},
      {path:'dashboard', component:DashboardComponent, data: { breadcrumb: 'Dashboard' }},
      {path:'users', loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)},
      {path:'chat', loadChildren: ()=>import('./chat/chat.module').then(m=>m.ChatModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
