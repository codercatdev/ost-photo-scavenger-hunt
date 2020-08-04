import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivitiesModule } from './../activities/activities.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamComponent } from './team.component';
import { TeamUsersComponent } from './team-users/team-users.component';


@NgModule({
  declarations: [TeamComponent, TeamUsersComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    RouterModule,
    MatToolbarModule,
    ActivitiesModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [TeamUsersComponent]
})
export class TeamModule { }
