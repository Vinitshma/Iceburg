import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet> 
  <ngx-ui-loader></ngx-ui-loader>
  <ng-toast></ng-toast>`
})
export class AppComponent {
  title = 'iceburg';

}
