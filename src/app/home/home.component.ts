import { map, first, switchMap, take, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Team } from '../models/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams$: Observable<any[]>;
  myTeams$: Observable<any[]>;
  user$: Observable<firebase.User>;
  private teamsRef = this.firestore.collection('teams', ref => ref.orderBy('name'));
  constructor(private firestore: AngularFirestore, private fireAuth: AngularFireAuth, private fireFunctions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.user$ = this.fireAuth.user;

    this.teams$ = this.teamsRef.snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as object;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));

    this.myTeams$ =
      this.user$.pipe(filter(u => u !== null), switchMap(u =>
        this.firestore.collection('teams', ref => ref.where('users', 'array-contains', u.uid).orderBy('name')).snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data() as object;
            const id = a.payload.doc.id;
            return { id, ...data };
          })))));
  }
  addTeaam(name: string): void {
    this.user$.pipe(take(1), switchMap(u =>
    this.teamsRef.add({ name, createdBy: u.uid, users: [u.uid] })
    )).subscribe();
  }
  loadActivities(): void {
    this.fireFunctions.httpsCallable('loadActivities')({}).pipe(first())
      .subscribe(c => console.log(c));
  }
}
