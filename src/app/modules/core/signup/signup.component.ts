import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm!:FormGroup;
  submitted:boolean=false;

 public minDate:Date = new Date(2000,0,1);
 public maxDate:Date = new Date();

 type:string = "password";
 eyeIcons:string = "fa-eye-slash";
 isText:boolean=false;
 backToSignup:boolean=false;

private serve = inject(CoreService);

  ngOnDestroy(){
    localStorage.removeItem("O_Id");
  }

  ngOnInit():void{
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      dob: new FormControl(''),
      gender: new FormControl('1'),
      //pattern 5 5.
      phone: new FormControl('', Validators.required),
      referBy: new FormControl(''),
      eMail: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      passWord: new FormControl('', Validators.required),
      //custome validator
      confirmPassword: new FormControl('', Validators.required)
    });
  }

 get frm(){
    return this.signupForm.controls;
  }

  saveSignupForm(){
    if(this.signupForm.valid){
      this.submitted = false;
      const data = this.signupForm.value;
      const obj = {
        "fullname": data.fullName,
        "dob": data.dob,
        "gender": +data.gender,
        "phone": data.phone,
        "uniqueId": data.referBy,
        "email": data.eMail,
        "username": data.username,
        "password": data.passWord,
      };

      console.log(obj);

      this.serve.signupSave(obj).subscribe((res)=>{
          console.log(res, "response")
          if(res.message == "Success"){
            localStorage.setItem('O_Id', res.oId);
            this.backToSignup = true;
          }
        },
        (err)=>{
          console.log("Error in getting storing data: " + JSON.stringify(err));
        });
    }else{
      this.submitted = true;
    }
  }


  cancelStatus(event:any){
    this.backToSignup = !this.backToSignup;
  }

  hideShowPsd(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcons = "fa-eye" : this.eyeIcons = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}
