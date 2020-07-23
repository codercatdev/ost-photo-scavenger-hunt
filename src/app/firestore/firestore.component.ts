import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.component.html',
  styleUrls: ['./firestore.component.css']
})
export class FirestoreComponent implements OnInit {
  @Input() expressions$: BehaviorSubject<string[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
