import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiService,
  GlobalConstants,
} from '../index';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../index';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //private currentUserSubject: BehaviorSubject<UserAuthenticationInterface>;
  //public currentUser: Observable<UserAuthenticationInterface>;

  private ctrName = 'SignUpIn';
  baseUrl: string = Config.url.adminLocalUrl;

  controllerName = Config.url.adminLocalUrl + "SignUpIn";

  constructor(
    private apiSvc: ApiService,
    private router: Router,
  ) {
  }

  // public get currentUserInfo(): UserAuthenticationInterface {
  //   return this.currentUserSubject.value;
  // }

  // login(user: UserAuthenticationInterface): Observable<UserAuthenticationInterface> {
  //   const data = user;
  //   return this.apiSvc.executeQuery(`${this.ctrName}/VerifyUser`, data, true);
  // }

  logout(): void {
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  // storeUserInfo(user: UserAuthenticationInterface): boolean {
  //   try {
  //     const userToJson = JSON.stringify(user);
  //     const encodedData = btoa(userToJson.toString());

  //     localStorage.setItem('currentUser', encodedData);
  //     this.currentUserSubject.next(user);
  //     return true;
  //   } catch {
  //     return false;
  //   }
  // }

  deleteToken() {
    if (localStorage.length) {
      for (let i = 1; i <= localStorage.length; i++) {
        const keys = localStorage.key(i - 1);
        localStorage.removeItem(keys);
        i--;
      }

      GlobalConstants.menuList = [];
    }
  }

  getMenus(locationID: number, userId: number) {
    const params = new HttpParams()
      .set('locationID', !locationID ? '0' : locationID.toString())
      .set('userID', userId.toString());

    return this.apiSvc.executeQuery(this.baseUrl + 'Admin/GetEComMenus', params).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

 

}




