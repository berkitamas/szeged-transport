import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './error/not-found/not-found.component';
import {RootComponent} from './root/root.component';
import {ContactComponent} from './contact/contact.component';
import {RouteComponent} from './route/route.component';
import {StopSearchComponent} from './stop-search/stop-search.component';
import {RouteSearchComponent} from './route-search/route-search.component';
import {StopComponent} from './stop/stop.component';

const routes: Routes = [
  { path: 'home', component: RootComponent },
  { path: '', component: RootComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'routes', component: RouteSearchComponent},
  { path: 'routes/:id', component: RouteComponent },
  { path: 'stops', component: StopSearchComponent },
  { path: 'stops/:id', component: StopComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static navItems = [
    { name: 'Főoldal', route: 'home' },
    { name: 'Járatok', route: 'routes' },
    { name: 'Megállók', route: 'stops' },
    { name: 'Kapcsolat', route: 'contact'}
  ];
}
