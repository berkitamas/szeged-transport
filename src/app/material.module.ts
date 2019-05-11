import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatListModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatInputModule
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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule
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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class MaterialModule { }
