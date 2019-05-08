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

@NgModule({
  declarations: [
    AppComponent,
    NavbarNavComponent,
    SidebarNavComponent,
    NotFoundComponent,
    RootComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
