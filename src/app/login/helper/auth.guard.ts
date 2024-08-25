import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    // const currentUser = this.authenticationService.currentUserInfo;
    // if (currentUser) {
    //     if(currentUser.mobileNo !="" && currentUser.password != "")  return true;
    //   // authorised so return true
    //   return false;
    // }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }

}
