import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatastoreComponent } from './datastore.component';



@NgModule({
  declarations: [DatastoreComponent],
  imports: [
    CommonModule
  ],
  exports: [DatastoreComponent]
})
export class DatastoreModule { }
