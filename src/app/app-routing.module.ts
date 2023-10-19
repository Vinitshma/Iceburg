import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { AuthGuard } from './guards/auth.guard';
import { NotfoundComponent } from './modules/shared/Components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path:'', loadChildren:()=> import("./modules/core/core.module").then(m=>m.CoreModule)
  },
  {
    path:'h', component:DefaultComponent,canActivate: [AuthGuard],
    children:[
      { path:'', loadChildren:()=> import("./modules/main/main.module").then(m=>m.MainModule) }
    ]
  },
  {
    path:"**", component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
