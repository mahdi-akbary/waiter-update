import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(() => {

      this.authService.browserLogout();

    }, (error) => {
      this.authService.browserLogout();
      this.matSnackBar.open('ERROR: could not logout');
      console.error('ERROR: could not logout', error);
    });
  }

}
