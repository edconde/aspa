import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'aspa-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs$;
  public isInitial;
  public initbreadcrumbs;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(event => this.buildBreadCrumb(this.activatedRoute.root))
      )
      .subscribe(event => (this.breadcrumbs$ = event));

    this.initbreadcrumbs = this.buildBreadCrumb(this.activatedRoute.root, true);
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    isInitial: Boolean = false,
    url?: string,
    breadcrumbs: Array<any> = []
  ): Array<any> {
    this.isInitial = isInitial;
    const label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';
    url = url ? url : '';

    let path = '';
    if (route.routeConfig && route.routeConfig.path) {
      path = route.routeConfig.path.split('/')[0];
    }

    let nextUrl = `${url}${path}/`;
    let breadcrumb = {
      label: label,
      url: nextUrl,
    };

    if (label !== '') {
      breadcrumbs.push(breadcrumb);
    }

    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].url = '';
    }

    if (route.firstChild) {
      return this.buildBreadCrumb(
        route.firstChild,
        this.isInitial,
        nextUrl,
        breadcrumbs
      );
    }
    return breadcrumbs;
  }
}
