import { FacesModule } from './../faces/faces.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreComponent } from './firestore.component';



@NgModule({
  declarations: [FirestoreComponent],
  imports: [
    CommonModule,
    FacesModule,
  ],
  exports: [FirestoreComponent]
})
export class FirestoreModule { }
