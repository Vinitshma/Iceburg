import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, map, shareReplay, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RootservService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  public _menuList = new BehaviorSubject<any>([]);
  public menuList$ = this._menuList.asObservable();

  constructor(private http: HttpClient, private errors: ErrorService) { }

  private API = environment.ApiUrl;

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.role$.next(role);
  }

  public getFullNameFromStore():Observable<any>{
    return this.fullName$.asObservable();
  }

  public setFullNameFromStore(fullname:string){
    return this.fullName$.next(fullname)
  }

  public getMenuList(uid:number, script:string){
    this.getMenus(uid).subscribe(res=>{
      this._menuList.next(res);
    },
    (err)=>{},
    ()=>{
      this.loadWithScript(script);
    });
  }

  getMenus(uid:number){
    return this.http.get(this.API+"Users/menusList?uiD="+ uid).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    );
  }

  public loadWithScript(scripts:string) {
    let tscript = document.createElement("script");
    tscript.type = "text/javascript";
    tscript.async = true;
    tscript.src = scripts;
    document.body.appendChild(tscript);
  }

}


  // ============================
  // getUsers(refresh?: boolean): Observable<HttpResponse<any>> {
  //   return this.http.get<HttpResponse<any>>(
  //     'https://6231f15359070d92733f63aa.mockapi.io/api/v1/users'
  //   );
  // }

  // searchUsers(name: string, latest: boolean): Observable<HttpResponse<any>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders(),
  //   };

  //   if (latest) {
  //     httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
  //   }

  //   return this.http.get<HttpResponse<any>>(
  //     `https://6231f15359070d92733f63aa.mockapi.io/api/v1/users?name=${name}&username=${name}`,
  //     httpOptions
  //   );
  // }
