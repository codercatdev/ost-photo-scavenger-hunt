import { map, first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams$: Observable<any[]>;
  user$: Observable<firebase.User>;
  private teamsRef = this.firestore.collection('teams');
  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth, private fireFunctions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.user$ = this.fireAuth.user;

    this.teams$ = this.teamsRef.snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as object;
      const id = a.payload.doc.id;
      return { id, ...data};
    })));
  }
  addTeaam(name: string): void{
    this.teamsRef.add({name});
  }
  loadActivities(): void{
    this.fireFunctions.httpsCallable('loadActivities')({}).pipe(first())
    .subscribe(c => console.log(c));
  }
}
