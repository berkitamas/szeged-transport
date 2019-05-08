import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './error/not-found/not-found.component';
import {RootComponent} from './root/root.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
  { path: 'home', component: RootComponent },
  { path: '', component: RootComponent },
  { path: 'contact', component: ContactComponent},
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
