import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "./customer.service";
import {TableService} from "../table/table.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.styl']
})
export class CustomerComponent implements OnInit {
  selected: any = null;
  newCustomer: any = null;
  customers: any[] = [];

  constructor(private customerService: CustomerService,
              private location: Location,
              public tableService: TableService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    if (!this.tableService.selectedTable) {
      this.router.navigate(['../tables'], {relativeTo: this.activatedRoute})
    } else {
      this.customerService.getCustomer(this.tableService.selectedTable).subscribe((res: any) => {
        this.customers = res.data;
      });
    }
  }

  next(selected) {
    this.customerService.isUpdatingOrder = true;
    this.customerService.selectedCustomer = selected;
    if (this.newCustomer) {
      this.customerService.isUpdatingOrder = false;
      this.customerService.selectedCustomer = this.newCustomer;
    }
    this.router.navigate(['../items'], {relativeTo: this.activatedRoute})
  }

  clear() {
    this.router.navigate(['../tables'], {relativeTo: this.activatedRoute})
  }
}
