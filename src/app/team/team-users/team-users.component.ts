import { Team } from './../../models/team';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, filter, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-team-users',
  templateUrl: './team-users.component.html',
  styles: [
  ]
})
export class TeamUsersComponent implements OnInit {
  @Input() team: Team;
  users$: Observable<Observable<firebase.User>[]>;
  me$: Observable<firebase.User>;
  addMe$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.users$ =
      this.firestore.doc<any>(`teams/${this.team.id}`).valueChanges()
        .pipe(filter(team => team.users != null), map(team => team.users.map(uid =>
          this.firestore.doc(`users/${uid}`).valueChanges()
        )));
    this.me$ = this.fireAuth.user;
    this.addMe$ = this.me$.pipe(switchMap(user =>
      this.firestore.doc<Team>(`teams/${this.team.id}`).valueChanges().pipe(map(team =>
        team.users && !team.users.includes(user.uid) ? true : false
      ))
    ));
  }
  addUser(): void {
    this.me$.pipe(switchMap(user =>
      this.firestore.doc(`teams/${this.team.id}`).set({ users: firebase.firestore.FieldValue.arrayUnion(user.uid) }, { merge: true })
    )).pipe(take(1)).subscribe();
  }
  removeUser(): void {
    this.me$.pipe(switchMap(user =>
      this.firestore.doc(`teams/${this.team.id}`).set({ users: firebase.firestore.FieldValue.arrayRemove(user.uid) }, { merge: true })
    )).pipe(take(1)).subscribe();
  }
  getInitial(displayName: string): string {
    const initials = displayName.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
}
