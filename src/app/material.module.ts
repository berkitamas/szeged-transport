import {NgModule} from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
