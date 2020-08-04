import { UploadComponent } from './../upload/upload.component';
import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styles: [
  ]
})
export class BottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, public dialog: MatDialog,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openUploadDialog(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '80%',
      data: this.data
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
}
