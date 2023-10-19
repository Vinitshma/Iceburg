import { Injectable } from '@angular/core';
import { RootservService } from './rootserv.service';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  userTypes:number=0;
  navigations:any=[];
  private static accessible:boolean = false;

  constructor(private serve: RootservService, private router: Router) { 
    this.userTypes = +JSON.parse(sessionStorage.getItem("Utype_ID") || '0');
    this.getMenus();
  }
  
  private getMenus(){
    this.serve.menuList$.subscribe(res=>{
      // console.log(res);
      this.navigations = res;
    })
  }

  userAccess(){
   this.router.events.subscribe(
    (ev:any) => {
      if (ev instanceof NavigationEnd) {
        // console.log(ev.url);
        const isUrl1 = this.navigations.filter((x:any)=>x.url == ev.url) || null;
        var isUrl2:any;
        const dumm = this.navigations.filter((re:any)=>{
          if(re.childList.length > 0){
            isUrl2 = re.childList.filter((x:any)=> x.url == ev.url) || null
          }
        });

        if(isUrl2.length > 0){
          PermissionService.accessible = true;
        }else if(isUrl1.length > 0 && isUrl1[0].childList.length == 0){
          PermissionService.accessible = true;
        }else{
          PermissionService.accessible = false;
        }
      }
    })
  }

  hasPermission():boolean{
    return PermissionService.accessible;
  }

}
