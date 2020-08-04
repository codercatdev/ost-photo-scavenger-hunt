import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { UploadComponent } from './upload/upload.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';



@NgModule({
  declarations: [ActivitiesComponent, UploadComponent, BottomSheetComponent, ViewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }
