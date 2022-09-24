import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { SidenavElement } from '../models/sidenavElement';

@Component({
  selector: 'aspa-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  sidenavElements: Array<SidenavElement> = [];
  title: string;
  options: Array<object>;

  @ViewChild('snav') sidenav: MatSidenav;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // this.mobileQuery = media.matchMedia('(max-width: 1279px)');
    this.mobileQuery = media.matchMedia('(max-width: 1439px)');

    this.mobileQueryListener = () => {
      this.setSidebarStatus();
      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    // muestra el sidenav abierto o cerrado al iniciar
    this.setSidebarStatus();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  setSidebarStatus(): void {
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
}
