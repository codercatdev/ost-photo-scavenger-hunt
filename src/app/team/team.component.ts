import { Team } from './../models/team';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map, take, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styles: [
  ]
})
export class TeamComponent implements OnInit {
  team$: Observable<any>;
  users$: Observable<Observable<firebase.User>[]>;
  me$: Observable<firebase.User>;
  addMe$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.team$ = this.route.params.pipe(switchMap(p =>
      this.firestore.doc<Team>(`teams/${p.id}`).valueChanges().pipe(map(t =>({...t, id: p.id})))
    ));
    this.users$ = this.route.params.pipe(switchMap(p =>
      this.firestore.doc<any>(`teams/${p.id}`).valueChanges()
        .pipe(filter(team => team.users != null), map(team => team.users.map(uid =>
          this.firestore.doc(`users/${uid}`).valueChanges()
        )))
    ));
    this.me$ = this.fireAuth.user;
    this.addMe$ = this.route.params.pipe(switchMap(p =>
      this.me$.pipe(switchMap(user =>
        this.firestore.doc<Team>(`teams/${p.id}`).valueChanges().pipe(map(team =>
          team.users && !team.users.includes(user.uid) ? true : false
        ))
      ))));
  }
  addUser(): void {
    this.route.params.pipe(switchMap(p =>
      this.me$.pipe(switchMap(user =>
        this.firestore.doc(`teams/${p.id}`).set({ users: firebase.firestore.FieldValue.arrayUnion(user.uid) }, {merge: true})
      )))).pipe(take(1)).subscribe();
  }
  removeUser(): void {
    this.route.params.pipe(switchMap(p =>
      this.me$.pipe(switchMap(user =>
        this.firestore.doc(`teams/${p.id}`).set({ users: firebase.firestore.FieldValue.arrayRemove(user.uid) }, {merge: true})
      )))).pipe(take(1)).subscribe();
  }
  getInitial(displayName: string): string{
    const initials = displayName.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
}
