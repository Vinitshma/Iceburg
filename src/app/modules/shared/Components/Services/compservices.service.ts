import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompservicesService {

  api = environment.ApiUrl;
  
  constructor(private http:HttpClient, private errors: ErrorService) { }

  getMailTemplate(){
    return this.http.get(this.api + "Login/getMailTemplate").pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  saveEndpoints(obj:any){
    return this.http.post(this.api + "PushSubscriptions/UserEndPoint", obj).pipe(
      map((value:any)=>{
        return value;
      }),
     catchError(this.errors.handlerror)
    )
  }

  getReports(){
    return this.http.get(this.api + "Report/reportDocs", {observe: 'response', responseType: 'blob'}).subscribe(res=>{
      // this._FileSaverService.save(res.body, "file.docx");
      console.log(res);
    })
  }
}
