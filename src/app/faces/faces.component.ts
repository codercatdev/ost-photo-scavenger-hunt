import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-faces',
  templateUrl: './faces.component.html',
  styleUrls: ['./faces.component.css']
})
export class FacesComponent implements OnInit {
  @Input() happy: number;
  @Input() sad: number;
  @Input() neutral: number;
  @Input() surprised: number;
  @Input() angry: number;
  constructor() { }

  ngOnInit(): void {
  }

}
