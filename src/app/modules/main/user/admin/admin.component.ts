import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UserserveService } from '../shared/services/userserve.service';
import { ConfirmationModalService } from 'src/app/lib/services/confirmatiom-model.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  
  @Input() isAdminActive:boolean = true;
  @Output() moveToUser:EventEmitter<any> = new EventEmitter;

  openAdminForm:boolean = false;
  userId:number=0;
  adminList:any = [];
  EditId:number=0;

  private serve = inject(UserserveService);
  private modelService= inject(ConfirmationModalService);

  ngOnInit(): void {
    this.userId = +JSON.parse(sessionStorage.getItem("U_ID") || '0');
    this.getAdminLis();
  }
  
  getAdminLis(){
    this.serve.getAdminListData().subscribe(
      (res)=>{
        console.log(res);
        this.adminList = res;
      }
    )
  }

  editAdmin(uid:number){
    this.openAdminForm = true;
    this.EditId = uid;
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

  deleteAdmin(uid:number){
    var modals = this.modelService.createConfirmationModal();
    modals.content?.showConfirmationModal(
      "Delete Confirmation",
      "Are you sure want to delete " + name + "?"
    );
    modals.content?.onClose.subscribe((res:boolean)=>{
      if(res === true){
        this.serve.removeAdmin(uid).subscribe(res=>{
          // console.log(res);
          this.serve.getAdminList();
        });
      }
    })
  }

  adminView(uid:number, item:any){
    if(item.userId != 1){
      sessionStorage.setItem("p_Id", JSON.stringify(uid))
      this.isAdminActive = !this.isAdminActive;
      this.moveToUser.emit(this.isAdminActive);
    }
  }

  checkAdminClosed(event:any){
    console.log(event, "event");
    this.getAdminLis();
    this.openAdminForm = event;
  }

}
