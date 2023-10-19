import { Component, OnInit, inject } from '@angular/core';
import { RootservService } from 'src/app/services/rootserv.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  // navigations=navItems;
  navigations:any=[];
  userTypes:number=0;
  private serve = inject(RootservService);

  ngOnInit():void{
    this.userTypes = +JSON.parse(sessionStorage.getItem("Utype_ID") || '0');
    // this.navigations = navItems;
    this.getMenus();
  }

  getMenus(){
    this.serve.menuList$.subscribe((res)=>{
      console.log(res);
      this.navigations = res;
    });
  }

 
}
