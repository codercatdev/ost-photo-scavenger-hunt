import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datastore',
  templateUrl: './datastore.component.html',
  styleUrls: ['./datastore.component.css']
})
export class DatastoreComponent implements OnInit {
  @Input() expressions$: BehaviorSubject<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
