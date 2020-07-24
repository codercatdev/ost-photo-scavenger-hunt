import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacesComponent } from './faces.component';



@NgModule({
  declarations: [FacesComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
  ],
  exports: [FacesComponent]
})
export class FacesModule { }
