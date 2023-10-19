import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats/chats.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component:ChatsComponent, data: { breadcrumb: 'Chats' }}
]

@NgModule({
  declarations: [
    ChatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModule { }
