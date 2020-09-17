import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "./dialog-data";

@Component({
  selector: 'app-set-api-dialog',
  templateUrl: './set-api-dialog.component.html',
  styleUrls: ['./set-api-dialog.component.css']
})
export class SetApiDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SetApiDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

  public onCancelClick() {
    this.dialogRef.close();
  }
}
