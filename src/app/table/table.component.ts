import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TableService} from "./table.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent implements OnInit {
  selected: any = null;
  tables: any[] = [];

  constructor(private tableService: TableService,
              private router: Router,
              private activatedRoute: ActivatedRoute,

              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.setTables();
  }

  setTables() {
    this.tableService.index().subscribe((res: any) => {
      this.tables = res.data;
    });
  }

  next(selected) {
    this.tableService.selectedTable = selected
    this.router.navigate(['../customers'], {relativeTo: this.activatedRoute})

  }


}
