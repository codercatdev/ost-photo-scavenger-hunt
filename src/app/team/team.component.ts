import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map, take, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styles: [
  ]
})
export class TeamComponent implements OnInit {
  team$: Observable<any>;
  users$: Observable<Observable<any>[]>;
  me$: Observable<firebase.User>;
  addMe$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.team$ = this.route.params.pipe(switchMap(p =>
      this.firestore.doc(`teams/${p.id}`).valueChanges()
    ));
    this.users$ = this.route.params.pipe(switchMap(p =>
      this.firestore.collection(`teams/${p.id}/users`).snapshotChanges()
        .pipe(map(users => users.map(a =>
          this.firestore.doc(`users/${a.payload.doc.id}`).valueChanges()
        )))
    ));
    this.me$ = this.fireAuth.user;
    this.addMe$ = this.route.params.pipe(switchMap(p =>
      this.me$.pipe(filter(user => user != null),switchMap(user =>
        this.firestore.doc(`teams/${p.id}/users/${user.uid}`).snapshotChanges().pipe(map(u =>
          u.payload.data() && u.payload.id === user.uid ? false : true
        ))
      ))));
  }
  addUser(): void {
    this.route.params.pipe(switchMap(p =>
      this.me$.pipe(switchMap(user =>
        this.firestore.doc(`teams/${p.id}/users/${user.uid}`).set({ uid: user.uid })
      )))).pipe(take(1)).subscribe();
  }
  removeUser(): void {
    this.route.params.pipe(switchMap(p =>
      this.me$.pipe(switchMap(user =>
        this.firestore.doc(`teams/${p.id}/users/${user.uid}`).delete()
      )))).pipe(take(1)).subscribe();
  }
  getInitial(displayName: string): string{
    const initials = displayName.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }
}
