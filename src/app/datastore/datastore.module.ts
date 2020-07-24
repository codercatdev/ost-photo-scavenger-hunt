import { FacesModule } from './../faces/faces.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatastoreComponent } from './datastore.component';



@NgModule({
  declarations: [DatastoreComponent],
  imports: [
    CommonModule,
    FacesModule,
  ],
  exports: [DatastoreComponent]
})
export class DatastoreModule { }
