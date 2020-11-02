import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TableService} from "./table.service";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent implements OnInit {
  selected: any = null;
  selectedCustomer: any = null;
  tables: any[] = [];
  customers: any[] = [];
  step: number;
  formField: any;

  constructor(private tableService: TableService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.setTables();
    this.resetFormFields();
  }

  setTables() {
    this.tableService.index().subscribe((res: any) => {
      this.tables = res.data;
      this.step = 1;
    })
  }

  next(selected) {
    if (this.step === 1) {
      this.formField.sourceTableId = selected;
      this.selected = null;
      this.tableService.getCustomer(selected).subscribe((res: any) => {
        this.customers = res.data
        this.step++;
      });
    } else if (this.step === 2) {
      this.formField.orderId = selected.order_id;
      this.selectedCustomer = selected;
      this.selected = null;
      this.step++;
    } else if (this.step === 3) {
      this.formField.destinationTableId = selected;
      this.selected = null;
      this.step++;
    } else if (this.step === 4) {
      this.tableService.transfer(this.formField).subscribe(res => {
        this.step = 1;
        this.resetFormFields();
      });
    }
  }

  resetFormFields() {
    this.formField = {
      destinationTableId: null,
      orderId: null,
      sourceTableId: null
    };
    this.selectedCustomer = null
  }

}
