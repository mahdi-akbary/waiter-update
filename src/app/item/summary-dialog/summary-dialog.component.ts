import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemService} from "../item.service";

@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.styl']
})
export class SummaryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SummaryDialogComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.itemService.submit(this.data).subscribe(res => {
      this.dialogRef.close(true);
    })
  }
}
