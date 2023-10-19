import { Component, OnInit, inject } from '@angular/core';
import { UserserveService } from '../shared/services/userserve.service';

@Component({
  selector: 'app-rcommon',
  templateUrl: './rcommon.component.html',
  styleUrls: ['./rcommon.component.scss']
})
export class RcommonComponent implements OnInit {

  isAdmin:boolean = true;
  currentMode:string="Admin List";
  userTypes!:number;
  UserIds:number=0;

  openAdminForm:boolean = false;
  openUserForm:boolean = false;
  
  private serve = inject(UserserveService);

  ngOnInit(): void {
    this.userTypes = +JSON.parse(sessionStorage.getItem("Utype_ID") || '0');
    
    if(this.userTypes == 1){
      this.isAdmin = true;
      this.currentMode = "Admin List";
    }else if(this.userTypes == 2){
      this.isAdmin = false;
      this.currentMode = "User List";
    }
  }

  checkViewMode(event:any){
    if(event != true){
      this.currentMode = "User List";
      this.isAdmin = false;
    }else{
      this.currentMode = "Admin List";
      this.isAdmin = true;
    }
  }

  addForm(){
    this.openAdminForm = true;
    if(this.isAdmin != true){
      this.UserIds = +JSON.parse(sessionStorage.getItem("p_Id") || '0');
    }else{
      this.UserIds = +JSON.parse(sessionStorage.getItem("U_ID") || '0');
    }
  }

  checkAdminClosed(event:any, uid:number){
    console.log(event, "events rcomm");
    this.openAdminForm = event;
    if([1,2].includes(this.userTypes)){
      this.serve.getAdminList();
    }else{
      this.serve.getUserList(uid)
    }
  }

}
