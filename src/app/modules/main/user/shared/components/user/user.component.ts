import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependecyModule } from 'src/app/modules/shared/dependecy/dependecy.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserveService } from '../../services/userserve.service';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, DependecyModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() closeModel!:boolean;
  @Input() Uid!: number;
  @Output() closeEvent:EventEmitter<any> = new EventEmitter;

  @ViewChild('openUserModel', {static: true}) openUserModel!:ElementRef;
  @ViewChild('dismisId') dismisId!:ElementRef;
  userForm!: FormGroup;

  getSubscription!: Subscription;
  editDetails:any;

  private serve = inject(UserserveService);
  private toast= inject(NgToastService); 

  ngOnInit(){
    this.getUserDetails();
    this.openUserModel.nativeElement.click();

    this.userForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      emailId: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      gender: new FormControl('1', Validators.required)
    });

  }

  get frm(){
    return this.userForm.controls;
  }

  getUserDetails(){
    this.getSubscription = this.serve.editUser(this.Uid).subscribe(
      (res)=>{
        // console.log(res);
        this.editDetails = res;
      },
      (err)=>{
        console.log(err);
      },
      ()=>{
        this.patchUserDetail();
        this.getSubscription.unsubscribe();
      }
    )
  }

  patchUserDetail(){
    this.userForm.patchValue({
      fullname: this.editDetails.fullname,
      username: this.editDetails.username,
      emailId: this.editDetails.email,
      phone: this.editDetails.phone,
      DOB: this.editDetails.dob,
      gender: JSON.stringify(this.editDetails.gender)
    });
  }

  updateUser(){
    if(this.userForm.valid){
      const data = this.userForm.value;
      const obj = {
        "fullname": data.fullname,
        "username": data.username,
        "email": data.emailId,
        "dob": data.DOB,
        "gender": +data.gender,
        "phone": data.phone,
        "userId": this.Uid
      };

      // console.log(obj);

      this.getSubscription = this.serve.updateProfile(obj).subscribe(
        (res)=>{
          // console.log(res);
          if(res.message == "Success"){
            this.dismisId.nativeElement.click();
            this.toast.success({detail:"Success",summary:"Successfully updated",duration:5000});
          }
        },
        (err)=>{
          console.log(err);
        },
        ()=>{
          this.getSubscription.unsubscribe();
        }
      )

    }else{
      console.log("Kindly fill all required field");
    }
  }

  close(){
    this.closeModel = !this.closeModel;
    this.closeEvent.emit(this.closeModel);
  }
  
}
