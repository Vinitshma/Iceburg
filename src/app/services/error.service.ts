import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handlerror(err: HttpErrorResponse){
    // console.log(err);
    let errorMsg = '';
    if(!err.error || !err.error.error){
      //console.log("Network Error");
      errorMsg = "There is some Unknown Error. Please try again after some time.";
    }else{
      if(err.error.error == 'Permission denied'){
        errorMsg = "You dont have permission to access this content";
      }else{
        errorMsg = err.error.message;
      }
    }
    return throwError(errorMsg);
  }

  errorHandler(error:any){
    return throwError(error.error.message);
  }
  
}
