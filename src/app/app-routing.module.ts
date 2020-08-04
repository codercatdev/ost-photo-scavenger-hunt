import { SignedInGuard } from './guards/signed-in.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  canActivateChild: [SignedInGuard]
},
{
  path: 'user',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule),
},
{
  path: 'team/:id',
  loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
  canActivateChild: [SignedInGuard]
},
{
  path: '**',
  redirectTo: 'home'
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
