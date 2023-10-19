import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CoreService } from '../services/core.service';
import { Router } from '@angular/router'
import { toasterService } from 'src/app/lib/services/toaster.service';
import { TokenService } from 'src/app/services/Authentications/tokens.service';
import { RootservService } from 'src/app/services/rootserv.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  loggedPageLoad:string = environment.loggedPageLoad;
  siteKey:string='';
  helperShow:boolean = false;
  public captchaResolved: boolean = false;
  backToSignIn:boolean=false;

  type:string = "password";
  eyeIcons:string = "fa-eye-slash";
  isText:boolean=false;

  constructor(private serv: CoreService, private router:Router,private userStore:RootservService,
     private toast:toasterService, private auth: TokenService){
    this.siteKey='6LeSkK8fAAAAAKVJwTJEU-8Bl_4IfiFrX2bdmRXr';
  }

  ngOnDestroy(){
    localStorage.removeItem("R_Id");
    localStorage.removeItem("O_Id");
  }

  handleCaptcha(res:any){
    this.captchaResolved = res.length > 0;
  }

  saveLoginForm(item:NgForm){
    if(this.isValid(item.value)){
      // console.log(item.value);
      let obj = {
        "username": item.value.username,
        "password": item.value.password
      };

      this.serv.signInSave(obj).subscribe((res)=>{
        // console.log(res, "response");
        if(res.message == "Success"){
          this.clear();
          item.form.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodeToken();
          sessionStorage.setItem('U_ID', tokenPayload.sub);
          sessionStorage.setItem('Utype_ID', tokenPayload.nameid);
          sessionStorage.setItem("_fNm", tokenPayload.name);
          this.userStore.setFullNameFromStore(tokenPayload.name);
          this.userStore.setRoleFromStore(tokenPayload.nameid);
          window.location.href = this.loggedPageLoad;
          this.toast.success("Success", "You're Logged.");
        }else{
          this.toast.error("Error",res?.message);
        }
      },
      (err)=>{
        this.toast.error("Error", 'Error in getting storing data:'+err)
      });
    }else{
      this.toast.info("Info", 'Kindly fill all fields');
    }
  }


  isValid(val:any):boolean{
    if(['', undefined, null].includes(val.username)){
      return false;
    }
    if(['', undefined, null].includes(val.password)){
      return false;
    }
    if(this.captchaResolved != true){
      return false;
    }
    return true;
  }

  clear(){
    this.captchaResolved = false;
  }

  cancelStatus(event:any){
    this.helperShow = !this.helperShow;
  }
  resetPsd(){
    this.helperShow = !this.helperShow;

  }
  signup(){
    this.router.navigate(['/signup']);
  }


  hideShowPsd(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcons = "fa-eye" : this.eyeIcons = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
}
