import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }
