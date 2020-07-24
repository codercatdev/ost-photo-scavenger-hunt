import { HomeModule } from './home/home.module';
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
},
{
  path: 'room/:id',
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
