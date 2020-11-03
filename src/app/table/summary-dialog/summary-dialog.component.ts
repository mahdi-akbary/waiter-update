import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TableService} from "../table.service";

@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.styl']
})
export class SummaryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SummaryDialogComponent>,
    private tableService: TableService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  submit() {
    this.tableService.submit(this.data).subscribe(res => {
      this.dialogRef.close(true);
    })
  }
}
