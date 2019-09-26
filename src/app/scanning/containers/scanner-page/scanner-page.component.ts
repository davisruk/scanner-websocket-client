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

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.sass']
})
export class ScannerPageComponent implements OnInit {
  constructor(
    private store: Store<fromScanner.State>,
    private breakpointObserver: BreakpointObserver
  ) {}

  socketState$: Observable<fromScanner.SocketState>;
  scannerState$: Observable<fromScanner.ScannerState>;
  connectInitEnded$: Subject<boolean> = new Subject<boolean>();

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
    this.connectSocket();
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
}
