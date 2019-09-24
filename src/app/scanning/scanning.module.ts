import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromScanner from './store/reducers/scanner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ScannerEffects } from './store/effects/scanner.effects';
import { ScannerPageComponent } from './containers/scanner-page/scanner-page.component';

@NgModule({
  declarations: [ScannerPageComponent],
  exports: [ScannerPageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromScanner.scannerFeatureKey, fromScanner.reducer),
    EffectsModule.forFeature([ScannerEffects])
  ]
})
export class ScanningModule {}
