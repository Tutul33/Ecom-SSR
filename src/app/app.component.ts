import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalConstants } from 'src/app/app-shared/models/javascriptVariables';
import { ConfigService } from './core/services/config.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})

export class AppComponent {
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  title = 'WinBees';
  currentRoute: string = null;
  constructor(private router: Router, private configSvc: ConfigService,@Inject(PLATFORM_ID) private platformId: any) {
    // this.router.navigateByUrl('ECM/home');
    this.setTimeout();
    this.userInactive.subscribe(() => {
      const currentUrl = this.router.url;
      if (currentUrl) {
        this.configSvc.setLocalStorage(
          GlobalConstants.localStorageKey.lastActiveRouteForForceLogout,
          currentUrl
        );
        // this.router.navigateByUrl('ECM/home');
      }
    });
  }
  setTimeout() {
    if(isPlatformBrowser(this.platformId)){
    this.userActivity = setTimeout(
      () => this.userInactive.next(undefined),
      1800000
    );
  }
  }
  @HostListener('window:mousemove') refreshUserState() {
    if(isPlatformBrowser(this.platformId)){
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }
}
