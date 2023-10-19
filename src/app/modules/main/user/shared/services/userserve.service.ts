import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';
import { AdminModel } from '../models/usermodels';

@Injectable({
  providedIn: 'root'
})
export class UserserveService {


  public _adminLists = new BehaviorSubject<any>([]);
  readonly adminObservable$ = this._adminLists.asObservable();
  public _userLists = new BehaviorSubject<any>([]);
  readonly userObservable$ = this._userLists.asObservable();

  constructor(private http: HttpClient, private errors: ErrorService) { }

  private API = environment.ApiUrl;

  updateProfileImage(obj:any):Observable<any>{
    return this.http.post(this.API+"Users/updateProfileImg", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  getUserprofile(uid:number):Observable<any>{
    return this.http.get(this.API+"Users/getUserProfile?Uid="+ uid).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  editUser(uid:number):Observable<any>{
    return this.http.get(this.API+"Users/getEditProfile?Uid="+ uid).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  updateProfile(obj:any){
    return this.http.post(this.API+"Users/updateProfile", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  // Admin ------------
  public getAdminListData(): Observable<any> {
    this.getAdminList();
    return this.adminObservable$;
  }

  getAdminList(){
    this.getAdminListApi().subscribe((res)=>{
      this._adminLists.next(res);
    })
  }

  getAdminListApi():Observable<any>{
    return this.http.get(this.API+"Users/getAdminList").pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  removeAdmin(userId:number){
    return this.http.delete(this.API+"Users/deleteAdmin?userId="+ userId).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  saveAdminForm(obj:FormData):Observable<FormData[]>{
    return this.http.post(this.API+"Users/saveAdminForm", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  updateAdminForm(obj:FormData):Observable<FormData[]>{
    return this.http.post(this.API+"Users/updateAdminForm", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  getEditAdmin(editId:number):Observable<any>{
    return this.http.get(this.API+"Users/getEditedAdmin?Uid="+ editId).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  updateAdminStatus(obj:any){
    return this.http.post(this.API+ "Users/updateAdminStatus", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  public getUserListData(Uid:number): Observable<any> {
    this.getUserList(Uid);
    return this.userObservable$;
  }

  getUserList(Uid:number){
    this.getUserListApi(Uid).subscribe((res)=>{
      this._userLists.next(res);
    })
  }

  getUserListApi(Uid:number):Observable<any>{
    return this.http.get(this.API+"Users/getUserList?Uid="+ Uid).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

}
