import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {environment as devEnvironment} from '../../environments/environment';
import {environment as prodEnvironment} from '../../environments/environment.prod';
import {ILoggedInUser, ILogin} from "../login/login.types";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  env = devEnvironment || prodEnvironment;

  constructor(private httpService: HttpService) {
  }

  init() {
  }

  login(data: ILogin): Observable<any> {
    return this.httpService.post('login', data);
  }

  logout(): Observable<void> {
    return this.httpService.post('logout', {});
  }

  isAuthenticated() {
    return !!localStorage.getItem('user');
  }

  get user(): ILoggedInUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  browserLogout() {

    // Clear current user info
    localStorage.clear();

    // Clear browser session
    this.deleteAllCookies();

    window.location.href = `/en/login`;

  }

  deleteAllCookies() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }

}

interface IUser {
  id: number
  last_update_datetime: Date | any;
  last_updated_by: number
  name: string;
  status: string
  user_type: string
  username: string
}
