import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserserveService } from '../shared/services/userserve.service';
import { ConfirmationModalService } from 'src/app/lib/services/confirmatiom-model.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  @Input() isAdminActive:boolean = true;
  @Output() moveToUser:EventEmitter<any> = new EventEmitter;

  private serve = inject(UserserveService);
  openUserForm:boolean = false;
  userId:number=0;
  userType:number=0;
  EditId:number=0;
  UserList:any= [];

  private modelService= inject(ConfirmationModalService);

  ngOnInit(): void {
    this.userType = +JSON.parse(sessionStorage.getItem("Utype_ID") || '0');
    if(this.userType != 2){
      this.userId = +JSON.parse(sessionStorage.getItem("p_Id") || '0');
    }else{
      this.userId = +JSON.parse(sessionStorage.getItem("U_ID") || '0');
    }

    this.getUserLis();
  }

 
  getUserLis() {
    this.serve.getUserListData(this.userId).subscribe(
      (res)=>{
        // console.log(res);
        this.UserList = res;
      }
    )
  }

  switchStatus(event:any, uid:number){
    // console.log(event.target.checked, uid);
    const obj = {
      "userId": uid,
      "status": event.target.checked
    }
    this.serve.updateAdminStatus(obj).subscribe(
      (res)=>{
        // console.log(res);
        this.serve.getAdminList();
      }
    )
  }
  
  editUser(uid:number){
    this.openUserForm = true;
    this.EditId = uid;
  }

  deleteUser(Uid:number){
    var modals = this.modelService.createConfirmationModal();
    modals.content?.showConfirmationModal(
      "Delete Confirmation",
      "Are you sure want to delete " + name + "?"
    );
    modals.content?.onClose.subscribe((res:boolean)=>{
      if(res === true){
        this.serve.removeAdmin(Uid).subscribe(res=>{
          console.log(res);
        });
      }
    })
  }

  checkUserClosed(event:any){
    this.getUserLis();
    this.openUserForm = event;
  }
}
