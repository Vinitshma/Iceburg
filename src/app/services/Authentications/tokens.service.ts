import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:"root"
})
export class TokenService{

  private API = environment.ApiUrl;
  private readonly userPayLoad:any;

  constructor(private http: HttpClient){
    this.userPayLoad = this.decodeToken();
  }

  renewToken(tokenApi:TokenApiModel){
    console.log("referes");
    return this.http.post<any>(`${this.API}Authentication/refresh`, tokenApi)
  }

  storeToken(tokenValue : string){
    sessionStorage.setItem('token', tokenValue)
  }

  storeRefreshToken(tokenValue : string){
    sessionStorage.setItem('refreshToken', tokenValue)
  }
  
  getToken(){
    return sessionStorage.getItem('token');
  }

  getRefreshToken(){
    return sessionStorage.getItem('refreshToken');
  }

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token');
  }

  decodeToken(){
    const token = this.getToken()!;
    if(token != null || undefined){
      let jwtData = token.split('.')[1];
      let jsondata = window.atob(jwtData);
      return JSON.parse(jsondata);
    }
  }


  getRolenameFromToken(){
    if(this.userPayLoad)
    return this.userPayLoad.role;
  }
}


export class TokenApiModel{
  accessToken!:string;
  refreshToken!:string;
}
