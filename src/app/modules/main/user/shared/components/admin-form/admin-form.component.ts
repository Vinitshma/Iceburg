import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DependecyModule } from 'src/app/modules/shared/dependecy/dependecy.module';
import { UserserveService } from '../../services/userserve.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminModel } from '../../models/usermodels';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'admin-form',
  standalone: true,
  imports: [CommonModule, DependecyModule],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit, OnDestroy{

  public ImageUrl = environment.resources;

  @Input() closeModel!:boolean;
  @Input() Uid!: number;
  @Input() editId!: number;
  @Output() closeEvent:EventEmitter<any> = new EventEmitter<{eventValue:boolean, uid:number}>();

  @ViewChild('openAdminModel', {static: true}) openAdminModel!:ElementRef;
  @ViewChild('dismisId1') dismisId!:ElementRef;

  public observableSub!:Subscription;
  private serve = inject(UserserveService);

  adminForm!: FormGroup;
  urls = new Array<string>();
  imageFile:any;
  adminProfile:any;
  type:string = "password";
  eyeIcons:string = "fa-eye-slash";
  isText:boolean=false;

  ngOnInit(){
    if(this.editId != null || undefined){
      this.editAdminForm(this.editId);
    }
    
    this.openAdminModel.nativeElement.click();

    this.adminForm = new FormGroup({
      profile: new FormControl(''),
      fullname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      DOB: new FormControl(''),
      gender: new FormControl('1'),
      emailId: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required),
    });
  }

  get frm(){
    return this.adminForm.controls;
  }

  ngOnDestroy(): void {
    this.adminForm.reset();
    this.imageFile = null;
    this.urls = [];
  }

  saveForm(){
    if(this.adminForm.valid){
      const data = this.adminForm.value;
      const obj:AdminModel = <AdminModel>{
        fullname : data.fullname,
        phone: data.phone,
        dob: data.DOB,
        gender: +data.gender,
        email: data.emailId,
        username: data.username,
        password: data.password,
        userType: data.userType,
        createdBy: this.Uid
      };
      // console.log(obj);
      const formdata: FormData = new FormData;
      formdata.append("profile", this.imageFile);
      formdata.append("formDetail", JSON.stringify(obj));

      this.observableSub = this.serve.saveAdminForm(formdata).subscribe(
        (res)=>{
          // console.log(res);
          this.close();
        },
        (err)=>{
          console.error(err);
        },
        ()=>{
          this.observableSub.unsubscribe();
          console.log("completed");
        }
      )
    }else{
      console.error("please fill all required fields");
    }
  }


  editAdminForm(editId:number){
    this.observableSub = this.serve.getEditAdmin(editId).subscribe(
      (res)=>{
        console.log(res);
        this.adminForm.patchValue({
          fullname: res.fullname,
          phone: res.phone,
          DOB: res.dob,
          gender: JSON.stringify(res.gender),
          emailId: res.email,
          username: res.username,
          password: res.password,
          userType: res.userType
        });
        this.adminProfile = res.profilePic;
      },
      (err)=>{},
      ()=>{
        // console.log("completed");
        this.observableSub.unsubscribe();
      }
    )
  }

  updateForm(){
    if(this.adminForm.valid){
      const data = this.adminForm.value;

      const obj:AdminModel = <AdminModel>{
        userId : this.editId,
        fullname : data.fullname,
        phone: data.phone,
        dob: data.DOB,
        gender: +data.gender,
        email: data.emailId,
        username: data.username,
        password: data.password,
        userType: data.userType
      };
      // console.log(obj);
      // console.log(this.imageFile);
      const formdata: FormData = new FormData;
      formdata.append("profile", this.imageFile);
      // if(this.imageFile != null || undefined){
      // }else{
      //   formdata.append("profile", "null");
      // }
      formdata.append("formDetail", JSON.stringify(obj));

      this.observableSub = this.serve.updateAdminForm(formdata).subscribe(
        (res)=>{
          // console.log(res);
          this.close();
        },
        (err)=>{
          console.error(err);
        },
        ()=>{
          this.observableSub.unsubscribe();
          console.log("completed");
        }
      )
    }else{
      console.error("please fill all required fields");
    }
  }

  profilePicUpload(event:any){
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }

    this.imageFile = files[0];
  }



  hideShowPsd(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcons = "fa-eye" : this.eyeIcons = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  close(){
    this.dismisId.nativeElement.click();
    this.closeModel = !this.closeModel;
    this.closeEvent.emit({eventValue:this.closeModel, uid:this.editId});
  }
}
