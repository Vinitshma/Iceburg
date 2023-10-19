import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

 private api:string = environment.ApiUrl;

  constructor(private http: HttpClient, private errors: ErrorService) { }

  signInSave(obj:any){
    return this.http.post(this.api + "Authentication/Signin", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  signupSave(obj:any){
    return this.http.post(this.api + "Authentication/Signup", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  verifyOtp(obj:any){
    return this.http.post(this.api + "Login/VerifyOtp", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  newPasswordSave(obj:any):Observable<any>{
    return this.http.post(this.api + "Login/NewPassword", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  resetPasswrd(val:any){
    return this.http.get(this.api + "Login/ResetPsd?eml="+ val).pipe(
      map((value:any)=>{
        return value;
      }),
      catchError(this.errors.handlerror)
    )
  }

}
