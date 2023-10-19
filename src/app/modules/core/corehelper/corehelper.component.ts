import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { CoreService } from '../services/core.service';
import { NgToastService } from 'ng-angular-popup';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-corehelper',
  templateUrl: './corehelper.component.html',
  styleUrls: ['./corehelper.component.scss']
})
export class CorehelperComponent{

  @Input() sentOn!:string;
  @Input() isFB:string="otp";
  @Input() cancelReset!:boolean;
  @Output() cancelEmit = new EventEmitter();

  email:string='';
  newPassword:string='';
  confirmPassword:string='';
  otp!:string;
  otp_type:string='actVerify';
  psd_eml:boolean = false;

  type:string = "password";
  type2:string = "password";
  eyeIcons:string = "fa-eye-slash";
  eyeIcons2:string = "fa-eye-slash";
  isText:boolean=false;
  isText2:boolean=false;

  constructor(private serve:CoreService, private router:Router, private toast: NgToastService, private errors:ErrorService ){}

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
  };

  otpFill(value: any): void {
    let val = value;
    this.otp = val;
  }
  
  VerifyOTP(){
    const otpId = JSON.parse( localStorage.getItem("O_Id") || '')
    if(this.otp != null){
      let obj = {
        "otp": this.otp,
        "email": this.sentOn,
        "userId": +otpId,
        "otptype": this.otp_type
      };
      this.serve.verifyOtp(obj).subscribe((res)=>{
        console.log(res, "response");
        if(res.message == "Success"){
          //register page
          if(this.otp_type == 'actVerify'){
            this.router.navigate(['/login']);
            this.toast.success({detail:"Success",summary:"You're successfully registered. ",duration:5000});
          }else if(res.type != null){
            // reset page
            localStorage.setItem('R_Id', JSON.stringify(res.oId));
            this.otp_type = "psdReset";
            this.isFB = 'psd';
            this.psd_eml = true;
          }
        }else{
          this.toast.error({detail:"Error",summary:res.message + ' to registered.',sticky:true});
        }
      }, (err)=>{
        this.toast.error({detail:"Error",summary:'Error on verification:'+err,sticky:true});
      })
    }
  }

  resetPsd(){
    if(!['', undefined, null].includes(this.email)){
      this.serve.resetPasswrd(this.email).subscribe((res)=>{
        console.log(res, "response");
        if(res.message == "Success"){
          localStorage.setItem('O_Id', res.oId);
          this.sentOn = this.email;
          this.isFB = 'otp';
          this.otp_type = "psdReset";
          this.email = "";
          this.otp = "";
        }
        // else{
        //   this.toast.error({detail:"Error",summary:res.message + ' to registered.',sticky:true});
        // }
      }, (err)=>{
        this.toast.error({detail:"Error",summary:'Error:'+err,sticky:true});
      })
    }
  }

  cancel(){
    if(this.isFB == "otp"){
      this.otp = "";
    }else{
      this.email = "";
    };

    this.newPassword = "";
    this.confirmPassword = "";

    this.cancelReset = !this.cancelReset;
    this.cancelEmit.emit(this.cancelReset);
  }

  signUp(){
    this.router.navigateByUrl('/signup');
  }

  // @ViewChild('rstpsd') rstbtn!:ElementRef;

  // passwordSave(){
  //   fromEvent(this.rstbtn.nativeElement, 'click');
  // }

  newPasswordSave(){
    const r_Uid = JSON.parse(localStorage.getItem("R_Id") || '');
    if(!['', undefined, null].includes(this.newPassword) && !['', undefined, null].includes(this.confirmPassword)
     && ![NaN, undefined, null].includes(+r_Uid)){
      const obj = {
        "newPassword": this.newPassword,
        "confirmPassword": this.confirmPassword,
        "userId": +r_Uid
      };
      this.serve.newPasswordSave(obj).subscribe(
        (res:any)=>{
        console.log(res, "respnse");
        if(res.message == "Success"){
          this.router.navigate(['/login']);
          this.cancel();
          this.toast.success({detail:"Success",summary:"Your password is modified. ",duration:5000});
        }
        // else{
        //   this.toast.error({detail:"Error",summary:res.message + ' to registered.',sticky:true});
        // }
      },
      (err)=>{
        this.errors.handlerror;
      });
    }
  }
 
  hideShowPsd(tp_:string){
    if(tp_ == 'n'){
      this.isText = !this.isText;
      this.isText ? this.eyeIcons = "fa-eye" : this.eyeIcons = "fa-eye-slash";
      this.isText ? this.type = "text" : this.type = "password";
    }else{
      this.isText2 = !this.isText2;
      this.isText2 ? this.eyeIcons2 = "fa-eye" : this.eyeIcons2 = "fa-eye-slash";
      this.isText2 ? this.type2 = "text" : this.type2 = "password";
    }
  }


}
