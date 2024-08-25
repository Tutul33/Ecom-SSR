import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

declare const window: any;

@Injectable({ providedIn: 'root' })
export class OnlineOfflineService {
  private internalConnectionChanged = new Subject<boolean>();
  private serverConnectionChanged = new Subject<boolean>();

  get connectionChanged() {
    return this.internalConnectionChanged.asObservable();
  }

  get serverConnectionChange() {
    return this.serverConnectionChanged.asObservable();
  }

  get isOnline() {
    if (isPlatformBrowser(this.platformId)) {
    return !!window.navigator.onLine;
    }
    return false;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
    }
  }

  private updateOnlineStatus() {
    if (isPlatformBrowser(this.platformId)) {
    this.internalConnectionChanged.next(window.navigator.onLine);
    }
  }

  updateServerOnlineStatus(online:boolean) {
    this.serverConnectionChanged.next(online);
  }

}