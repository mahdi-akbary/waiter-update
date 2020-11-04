import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {environment as devEnvironment} from "../../environments/environment";
import {environment as prodEnvironment} from "../../environments/environment.prod";
import {Location} from "@angular/common";
import {SummaryDialogComponent} from "./summary-dialog/summary-dialog.component";
import {AuthService} from "../services/auth.service";
import {NoteDialogComponent} from "./note-dialog/note-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "./item.service";
import {CustomerService} from "../customer/customer.service";
import {TableService} from "../table/table.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.styl']
})
export class ItemComponent implements OnInit {
  categories: any[] = [];
  items: any[] = [];
  env = devEnvironment || prodEnvironment;
  urlLink: string;
  isEnabled: boolean = false;

  constructor(private itemService: ItemService,
              public customerService: CustomerService,
              public tableService: TableService,
              private location: Location,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    if (!this.customerService.selectedCustomer || !this.tableService.selectedTable) {
      this.router.navigate(['../tables'], {relativeTo: this.activatedRoute})
    } else {
      this.urlLink = this.env.baseUrl.frontEnd + localStorage.getItem('lang')
      this.itemService.categories().subscribe((res: any) => {
        this.categories = res.data;
      });
      this.itemService.items().subscribe((res: any) => {
        this.items = res.data;
        this.items.forEach(item => {
          item.quantity = 0
          item.name = {dari: item.name_dari, english: item.name_english}
          item.category = {
            id: item.category_id,
            name: {dari: item.category_name_dari, english: item.category_name_english}
          }
        });
      })
    }

  }

  updateQuantity(SelectedItem, value) {
    this.items.forEach(item => {
      if (item.id === SelectedItem.id && (item.quantity + value) >= 0) {
        item.quantity = item.quantity + value
      }
    })
    this.isEnabled = !!this.items.find(item => item.quantity > 0);
  }

  preview() {
    const data = {
      customerName: this.customerService.selectedCustomer,
      isUpdatingOrder: this.customerService.isUpdatingOrder,
      items: this.items.filter(item => item.quantity > 0),
      tableId: this.tableService.selectedTable,
      waiterId: this.authService.user.id
    };
    const dialogRef = this.dialog.open(SummaryDialogComponent, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['../tables'], {relativeTo: this.activatedRoute})
      }
    });
  }

  addNotes(item) {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '500px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.notes) {
        this.items.forEach(element => {
          if (element.id === item.id) {
            element.notes = result.notes;
          }
        })
      }
    });
  }

  clear(){
    this.router.navigate(['../tables'], {relativeTo: this.activatedRoute})
  }

}
