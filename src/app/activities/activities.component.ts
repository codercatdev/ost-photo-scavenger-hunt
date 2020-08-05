import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Team } from './../models/team';
import { Activity, SubmittedActivity } from './../models/activity';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, switchMap, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styles: [`
  table {
    width: 100%;
  }
  th {
    position: sticky;
    top: 64px;
    z-index: 100;
    background: #7b1fa2;
  }
  .mat-footer-cell{
    background: #7b1fa2;
  }
  `]
})

export class ActivitiesComponent implements OnInit {
  activities$: Observable<any>;
  dataSource = new MatTableDataSource<Activity>();
  search$ = new BehaviorSubject(null);
  displayedColumns$: Observable<string[]>;
  header$: Observable<string[]>;

  activityFilter = '';
  pointsFilter = 0;
  locationFilter = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @Input() team: Team;

  constructor(private firestore: AngularFirestore, private bottomSheet: MatBottomSheet,
              public dialog: MatDialog, public mediaObserver: MediaObserver) {}

  ngOnInit(): void {
    this.displayedColumns$ = this.mediaObserver.asObservable().pipe(map(media =>
      media.find(m => ['sm', 'xs'].some(v => v === m.mqAlias)) ?
      ['activity', 'submit'] :
      ['activity', 'points', 'location', 'submit']
    ));

    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data) => {
      return (this.activityFilter ? data.activity.toLowerCase().trim().includes(this.activityFilter.toLowerCase().trim()) : true) &&
        (this.pointsFilter ? data.points === this.pointsFilter : true) &&
        (this.locationFilter ? data.location.includes(this.locationFilter) : true);
    };
    this.activities$ =
      this.firestore.doc<Team>(`teams/${this.team.id}`).valueChanges().pipe(filter(team => team != null), switchMap(team =>
        this.firestore.collection<SubmittedActivity>('activities', ref => ref.orderBy('points', 'asc')).snapshotChanges()
          .pipe(map(actions => actions.map(a => {
            const data = a.payload.doc.data() as object;
            const id = a.payload.doc.id;
            const submitted = team.activities && team.activities[id] ? team.activities[id] : null;
            return { id, ...data, submitted } as SubmittedActivity;
          })),
            tap(d => this.dataSource.data = d)
          )));
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activityFilter = filterValue;
    this.setFilter();
  }
  pointSelect(event: MatSelectChange): void {
    this.pointsFilter = parseInt(event.value);
    this.setFilter();

  }
  locationSelect(event: MatSelectChange): void {
    this.locationFilter = event.value;
    this.setFilter();
  }
  setFilter(): void {
    this.dataSource.filter = 'anything';
  }
  openBottomSheet(activityId: string): void {
    this.bottomSheet.open(BottomSheetComponent, { data: { teamId: this.team.id, activityId } });
  }
  openUploadDialog(activityId: string): void {
    const dialogRef = this.dialog.open(UploadComponent, {
      height: '90vh',
      data: { teamId: this.team.id, activityId }
    });
  }
  view(activity: Activity): void{
    this.dialog.open(ViewComponent,{
      height: '90vh',
      data: {activity, team: this.team}
    });
  }
}
