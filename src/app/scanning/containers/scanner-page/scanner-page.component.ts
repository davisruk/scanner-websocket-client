import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromScanner from '../../store/reducers/scanner.reducer';
import { iif } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  ScannerActionTypes,
  ConnectSocket,
  ScannerStatusQuery,
  StartScannerEventListener
} from '../../store/actions/scanner.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.sass']
})
export class ScannerPageComponent implements OnInit {
  constructor(private store: Store<fromScanner.State>) {}
  socketState$: Observable<fromScanner.SocketState>;
  scannerState$: Observable<fromScanner.ScannerState>;
  connectInitEnded$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.socketState$ = this.store.select(fromScanner.selectSocketState);
    this.scannerState$ = this.store.select(fromScanner.selectScannerState);
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
}
