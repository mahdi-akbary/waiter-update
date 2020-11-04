import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {

      this.authService.browserLogout();

      return false;
    }
    return true;
  }
}
