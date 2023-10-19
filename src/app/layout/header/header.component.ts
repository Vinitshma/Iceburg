import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  username:string="";
  constructor(private router:Router){
    this.username = sessionStorage.getItem("_fNm") || "";
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.clear();
    sessionStorage.clear();
  }


  profile(){
    this.router.navigateByUrl('/h/users/profile')
  }

}
