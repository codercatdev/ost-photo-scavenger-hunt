import { DatastoreModule } from './../datastore/datastore.module';
import { FirestoreModule } from './../firestore/firestore.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapturesRoutingModule } from './captures-routing.module';
import { CapturesComponent } from './captures.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CapturesComponent
  },
];

@NgModule({
  declarations: [CapturesComponent],
  imports: [
    CommonModule,
    CapturesRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FirestoreModule,
    DatastoreModule,
  ]
})
export class CapturesModule { }
