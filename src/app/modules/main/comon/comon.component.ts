import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { buffer, filter, map } from 'rxjs';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-comon',
  templateUrl: './comon.component.html'
})
export class ComonComponent implements OnInit{

  breadCrumbs: any;

  constructor(private router: Router, private perm:PermissionService) {}

  ngOnInit():void {
    this.breadCrumbs = JSON.parse(sessionStorage.getItem('cur_pg') || '{}');
    
    // once per loading a component that is in the end of the current route
    const navigationEnd$ = this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd));

    this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd), buffer(navigationEnd$),
      map((bcData: any[]) => bcData.reverse())).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      this.addBreadcrumb(root, []);
    });
    this.perm.userAccess();
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));
      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          url: '/' + routeUrl.join('/')
        };
        sessionStorage.setItem('cur_pg', JSON.stringify(breadcrumb));

        this.breadCrumbs = breadcrumb;
      }

      //@ts-ignore
      this.addBreadcrumb(route.firstChild, routeUrl);
    }}

    private getLabel(data: any) {
      return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
    }

}
