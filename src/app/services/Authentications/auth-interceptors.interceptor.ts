import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TokenApiModel, TokenService } from './tokens.service';
import { Router } from '@angular/router';
import { toasterService } from 'src/app/lib/services/toaster.service';

@Injectable()
export class AuthInterceptors implements HttpInterceptor {

    constructor(private auth:TokenService, private toast:toasterService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders : {
        Authorization: 'Bearer ' +  myToken
        }
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            // this.toast.warning("Warning", "Token is expired, Login again");
            // this.router.navigate(['/login']);
            return this.handle401Error(request, next);
          }
        }
        return throwError(()=> new Error("Some other error occured"));
      })
    )
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data:TokenApiModel)=>{
            console.log(data, "data")
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);
          req = req.clone({
            setHeaders : {
            Authorization: `Bearer ${data.accessToken}`   
          }
          })
          return next.handle(req);
        }),
        catchError((err)=>{
          return throwError(()=>{
            this.toast.warning("Warning", "Token is expired, Login again");
            this.router.navigate(['/login']);
          })
        })
      )
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptors, multi: true }
];
