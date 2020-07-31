import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';


const routes: Routes = [
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  canActivate: [LoggedInGuard]
},
{
  path: 'user',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule),
},
{
  path: 'team/:id',
  loadChildren: () => import('./captures/captures.module').then(m => m.CapturesModule),
},
{
  path: '**',
  redirectTo: 'home'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
