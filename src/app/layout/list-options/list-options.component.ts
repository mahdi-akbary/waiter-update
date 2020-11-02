import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.styl']
})
export class ListOptionsComponent implements OnInit {
  lang: string | 'en' | 'prs' | 'ps';
  selectedPath: string;

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    this.setSelectedPath(this.location.path());
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.setSelectedPath(event.urlAfterRedirects)
    });

  }

  setSelectedPath(pathString: string) {
    const urlArray = pathString.split('/')
    this.selectedPath = urlArray[urlArray.length - 1];
  }

  redirectTo(path) {
    this.router.navigate([path], {relativeTo: this.activatedRoute})
  }
}

