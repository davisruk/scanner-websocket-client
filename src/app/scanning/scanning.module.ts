import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromScanner from './store/reducers/scanner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ScannerEffects } from './store/effects/scanner.effects';
import { ScannerPageComponent } from './containers/scanner-page/scanner-page.component';
import { ScannerWebSocketService } from './services/scanner-web-socket/scanner-web-socket.service';
import { SocketStateComponent } from './containers/socket-state/socket-state.component';
import { ScannerStateComponent } from './containers/scanner-state/scanner-state.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { XMLBeautifyPipe } from './pipes/xml-beautify-pipe';

@NgModule({
  declarations: [
    ScannerPageComponent,
    SocketStateComponent,
    ScannerStateComponent,
    XMLBeautifyPipe
  ],
  exports: [ScannerPageComponent],
  providers: [ScannerWebSocketService],
  imports: [
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromScanner.scannerFeatureKey, fromScanner.reducer),
    EffectsModule.forFeature([ScannerEffects])
  ]
})
export class ScanningModule {}
