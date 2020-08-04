import { Activity } from './../models/activity';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
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
    background: black;
  }
  `]
})

export class ActivitiesComponent implements OnInit {
  dataSource = new MatTableDataSource<Activity>();
  search$ = new BehaviorSubject(null);
  displayedColumns: string[] = ['activity', 'points', 'location'];

  activityFilter = '';
  pointsFilter = 0;
  locationFilter = '';
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(this.locationFilter);

      return (this.activityFilter ? data.activity.toLowerCase().trim().includes(this.activityFilter.toLowerCase().trim()) : true) &&
      (this.pointsFilter ? data.points === this.pointsFilter : true) &&
      (this.locationFilter ? data.location.includes(this.locationFilter) : true)

    };
    this.firestore.collection<Activity>('activities', ref => ref.orderBy('points', 'asc')).valueChanges()
    .subscribe(d => this.dataSource.data = d);
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
}
