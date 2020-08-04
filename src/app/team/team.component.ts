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
  }
}
