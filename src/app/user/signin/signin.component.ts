import { Component, OnInit } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {
  providers = [AuthProvider.Google];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onCreateAccountRequested(): void{
    this.router.navigate(['/user/register']);
  }
  onSuccess(): void{
    this.router.navigate(['/home']);
  }
}
