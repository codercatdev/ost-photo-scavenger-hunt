import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, take, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: [`
    a{
      color: white;
    }
  `]
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files: FileUpload[] = [];
  uploading$ = new BehaviorSubject(false);
  constructor(private firestore: AngularFirestore, private fireStorage: AngularFireStorage,
      private fireAuth: AngularFireAuth,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UploadComponent>, ) { }

  ngAfterViewInit(): void{
    this.onClick();
  }

  onClick(): void {
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {
      this.uploading$.next(true);
      for (const file of fileInput.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.files.push({ data: file, inProgress: false, progress: null, imgURL: reader.result });
          this.callUploadService(file);
        };
      }
    };
    fileInput.click();
  }

  callUploadService(file: FileUpload): void {
    const formData = new FormData();
    const filePath = `${this.data.teamId}/${this.data.activityId}`;
    formData.append('file', file.data);
    file.inProgress = true;
    const task = this.fireStorage.upload(filePath, file);

    file.progress = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        file.downloadURL = this.fireStorage.ref(filePath).getDownloadURL();
        file.downloadURL.pipe(
          take(1)).subscribe(downloadURL => {
            this.fireAuth.user.pipe(take(1)).subscribe(user => {
              const activities = {
                [this.data.activityId] : {
                  downloadURL,
                  uid: user.uid,
                  submitted: firebase.firestore.FieldValue.serverTimestamp()
                }
              };
              this.firestore.doc(`teams/${this.data.teamId}`).set({
                activities
              }, {merge: true});
            });
          });
        })).subscribe();
  }
  close(): void{
    this.dialogRef.close();
  }
}
export interface FileUpload { data: any; inProgress: boolean; progress: Observable<number>; imgURL: any; downloadURL?: Observable<string>; }
