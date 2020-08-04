import { Team } from './../models/team';
import { Activity, SubmittedActivity } from './../models/activity';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';

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
  activities$;
  dataSource = new MatTableDataSource<Activity>();
  search$ = new BehaviorSubject(null);
  displayedColumns: string[] = ['activity', 'points', 'location', 'submit'];

  activityFilter = '';
  pointsFilter = 0;
  locationFilter = '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() team: Team;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      return (this.activityFilter ? data.activity.toLowerCase().trim().includes(this.activityFilter.toLowerCase().trim()) : true) &&
      (this.pointsFilter ? data.points === this.pointsFilter : true) &&
      (this.locationFilter ? data.location.includes(this.locationFilter) : true)
    };
    this.activities$ = this.firestore.collection<SubmittedActivity>('activities', ref => ref.orderBy('points', 'asc')).snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as object;
      const id = a.payload.doc.id;
      const submitted = this.team.activities[id] ? this.team.activities[id] : null;
      return { id, ...data, submitted } as SubmittedActivity;
    })),
    tap(d => this.dataSource.data = d)
    );
  }
  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.activityFilter = filterValue;
    this.setFilter();
  }
  pointSelect(event: MatSelectChange): void{
    this.pointsFilter = parseInt(event.value);
    this.setFilter();

  }
  locationSelect(event: MatSelectChange): void{
    this.locationFilter = event.value;
    this.setFilter();
  }
  setFilter(): void{
    this.dataSource.filter = 'anything';
  }
  submit(activityId: string): void{
    console.log(activityId)
  }
}
