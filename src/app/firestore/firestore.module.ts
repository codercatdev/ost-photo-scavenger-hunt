import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreComponent } from './firestore.component';



@NgModule({
  declarations: [FirestoreComponent],
  imports: [
    CommonModule
  ],
  exports: [FirestoreComponent]
})
export class FirestoreModule { }
