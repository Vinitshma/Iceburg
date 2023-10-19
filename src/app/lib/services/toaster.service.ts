import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class toasterService {

  constructor(private toast: NgToastService) { }

  success(title:string, message:string){
    this.toast.success({detail:title,summary:message,duration:5000});
  }

  warning(title:string, message:string){
    this.toast.warning({detail:title,summary:message,sticky:true});
  }
  
  info(title:string, message:string){
    this.toast.info({detail:title,summary:message,sticky:true});
  }

  error(title:string, message:string){
    this.toast.error({detail:title,summary:message,sticky:true});
  }


}
