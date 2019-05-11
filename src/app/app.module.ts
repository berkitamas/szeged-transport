import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { NavbarNavComponent } from './nav/navbar-nav/navbar-nav.component';
import { SidebarNavComponent } from './nav/sidebar-nav/sidebar-nav.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { RootComponent } from './root/root.component';
import { ContactComponent } from './contact/contact.component';
import {HttpClientModule} from '@angular/common/http';
import {RouteService} from './core/services/route.service';
import { RouteComponent } from './route/route.component';
import { StopSearchComponent } from './stop-search/stop-search.component';
import {AgmCoreModule} from '@agm/core';
import { TimeCounterDirective } from './core/directives/time-counter.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { RouteSearchComponent } from './route-search/route-search.component';
import { StopComponent } from './stop/stop.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarNavComponent,
    SidebarNavComponent,
    NotFoundComponent,
    RootComponent,
    ContactComponent,
    RouteComponent,
    StopSearchComponent,
    TimeCounterDirective,
    FooterComponent,
    RouteSearchComponent,
    StopComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcsNk5FNfk-QksDo--9PyJs4dfjTWBMEk'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
