/*********************************/
/* Scanner Page Smart Component  */
/* Handles all store interaction */
/*********************************/

import { MatSnackBar } from '@angular/material/snack-bar';
import { DisconnectSocket } from './../../store/actions/scanner.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromScanner from '../../store/reducers/scanner.reducer';
import { map } from 'rxjs/operators';
import {
  ConnectSocket,
  ScannerStatusQuery,
  StartScannerEventListener,
  ReconnectScanner
} from '../../store/actions/scanner.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.sass']
})
export class ScannerPageComponent implements OnInit {
  constructor(
    private store: Store<fromScanner.State>,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'barcode-scan',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/barcode-scan.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'socket',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/img/power-socket-uk.svg'
      )
    );
  }

  socketState$: Observable<fromScanner.SocketState>;
  scannerState$: Observable<fromScanner.ScannerState>;
  connectInitEnded$: Subject<boolean> = new Subject<boolean>();
  scannerStatusMessage$: Observable<string>;
  spans = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return { cols: 1, rows: 2 };
      }
      return { cols: 2, rows: 1 };
    })
  );

  ngOnInit() {
    this.socketState$ = this.store.select(fromScanner.selectSocketState);
    this.scannerState$ = this.store.select(fromScanner.selectScannerState);
    this.scannerStatusMessage$ = this.store.select(
      fromScanner.selectScannerStatusMessage
    );
    this.connectSocket();
    this.scannerStatusMessage$.subscribe(message =>
      this.openSnackBar(message, '')
    );
  }

  connectSocket() {
    this.store.dispatch(new ConnectSocket());
    this.socketState$
      .pipe(
        map(socketState => {
          if (socketState.socketConnected) {
            this.store.dispatch(new StartScannerEventListener());
            this.connectInitEnded$.next(true);
            this.store.dispatch(new ScannerStatusQuery());
          }
        }),
        takeUntil(this.connectInitEnded$)
      )
      .subscribe();
  }

  disconnectSocket() {
    this.store.dispatch(new DisconnectSocket());
  }

  onConnectScanner() {
    this.store.dispatch(new ReconnectScanner());
  }

  handleToggleSocketState(socketState: fromScanner.SocketState) {
    socketState.socketConnected
      ? this.disconnectSocket()
      : this.connectSocket();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar-background'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
}
