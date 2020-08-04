import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {
  providers = [AuthProvider.Google, AuthProvider.Microsoft];
  constructor(private router: Router, private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {}
  onCreateAccountRequested(): void{
    this.router.navigate(['/user/register']);
  }
  onSuccess(): void{
    this.router.navigate(['/home']);
  }
}
