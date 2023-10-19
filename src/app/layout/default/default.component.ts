import { Component } from '@angular/core';
import { RootservService } from 'src/app/services/rootserv.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {

  constructor(private serv:RootservService) {
    // this.serv.loadWithScript("../../../assets/js/pcoded.js");
    const uTypeId = +JSON.parse(sessionStorage.getItem("Utype_ID") || '0');
    this.serv.getMenuList(uTypeId, "../../../assets/js/pcoded.js");
  }

}
