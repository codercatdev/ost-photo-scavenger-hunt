import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styles: [
  ]
})
export class ViewComponent implements OnInit {

  constructor(private firestore: AngularFirestore,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UploadComponent>, ) { }

  ngOnInit(): void {
  }
  delete(): void{
    this.firestore.doc(`/teams/${this.data.team.id}`)
    .set({activities: { [this.data.activity.id] : firebase.firestore.FieldValue.delete()}}, {merge: true})
    .then(() => this.dialogRef.close());
  }
}
