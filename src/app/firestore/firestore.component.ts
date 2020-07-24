import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { tap, takeUntil, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.component.html',
  styleUrls: ['./firestore.component.css']
})
export class FirestoreComponent implements OnInit, OnDestroy {
  @Input() expressions$: BehaviorSubject<string[]>;

  private destroy$ = new Subject<boolean>();
  public happy$: Observable<number>;
  public sad$: Observable<number>;
  public neutral$: Observable<number>;
  public surprised$: Observable<number>;
  public angry$: Observable<number>;
  constructor(private route: ActivatedRoute, private fireAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.fireAuth.user.pipe(
      takeUntil(this.destroy$),
      tap(async user => {
        if (user == null) {
          try {
            await this.fireAuth.signInAnonymously();
            this.updateRoom(user);
          } catch (err) {
            console.log(err);
          }
        } else {
          this.updateRoom(user);
        }
      })).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  updateRoom(user: firebase.User): void {
    this.route.params.pipe(switchMap(params => {
      this.happy$ = this.emotionCount(params, 'happy');
      this.sad$ = this.emotionCount(params, 'sad');
      this.neutral$ = this.emotionCount(params, 'neutral');
      this.surprised$ = this.emotionCount(params, 'surprised');
      this.angry$ = this.emotionCount(params, 'angry');
      return this.expressions$.pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => prev[0] === curr[0]),
        tap(expression => {
          this.firestore.doc<Emotion>(`rooms/${params.id}/users/${user.uid}`)
            .set({
              expression,
              last_changed: firebase.firestore.FieldValue.serverTimestamp()
            });
        }));
    })).subscribe();
  }

  emotionCount(params: Params, emotion: string): Observable<number> {
    return this.firestore.collection<Emotion>(`rooms/${params.id}/users/`, ref =>
      ref.where('expression', 'array-contains', emotion)
    ).valueChanges().pipe(map(docs => {
      let count = 0;
      docs.forEach(doc => {
        count = count + doc?.expression.length || 0;
      });
      return count;
    }));
  }
}

interface Emotion {
  expression: string[];
  last_changed: firebase.firestore.FieldValue;
}
