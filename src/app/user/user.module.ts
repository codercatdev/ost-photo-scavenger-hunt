import { RouterModule } from '@angular/router';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [SigninComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    NgxAuthFirebaseUIModule
  ]
})
export class UserModule { }
