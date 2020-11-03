import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TableService} from "./table.service";
import {environment as devEnvironment} from "../../environments/environment";
import {environment as prodEnvironment} from "../../environments/environment.prod";
import {Location} from "@angular/common";
import {SummaryDialogComponent} from "./summary-dialog/summary-dialog.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent implements OnInit {
  selected: any = null;
  selectedCustomer: any = null;
  tables: any[] = [];
  categories: any[] = [];
  items: any[] = [];
  customers: any[] = [];
  step: number;
  env = devEnvironment || prodEnvironment;
  urlLink: string;
  isUpdatingOrder = false;
  selectedTable: number = null;

  constructor(private tableService: TableService,
              private location: Location,
              private authService: AuthService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    console.log(this.location.path());
    this.urlLink = this.env.baseUrl.frontEnd + localStorage.getItem('lang')
    this.setTables();
    this.selectedCustomer = null
  }

  setTables() {
    this.tableService.index().subscribe((res: any) => {
      this.tables = res.data;
      this.step = 1;
    });
    this.tableService.categories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories)
    });
    this.tableService.items().subscribe((res: any) => {
      this.items = res.data;
      this.items.forEach(item => {
        item.quantity = 0
        item.name = {dari: item.name_dari, english: item.name_english}
        item.category = {
          id: item.category_id,
          name: {dari: item.category_name_dari, english: item.category_name_english}
        }
      });
      console.log(this.items)
    })
  }

  next(selected) {
    if (this.step === 1) {
      this.selected = null;
      this.selectedTable = selected;
      this.tableService.getCustomer(selected).subscribe((res: any) => {
        this.customers = res.data;
        this.step++;
      });
    } else if (this.step === 2) {
      this.isUpdatingOrder = !!selected;
      this.selected = null;
      this.step++;
    } else if (this.step === 3) {
      this.selected = null;
      this.step++;
    }
  }

  updateQuantity(SelectedItem, value) {
    this.items.forEach(item => {
      if (item.id === SelectedItem.id && (item.quantity + value) >= 0) {
        item.quantity = item.quantity + value
      }
    })
  }

  preview() {
    const data = {
      customerName: this.selectedCustomer,
      isUpdatingOrder: this.isUpdatingOrder,
      items: this.items.filter(item => item.quantity > 0),
      tableId: this.selectedTable,
      waiterId: this.authService.user.id
    };
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

}
