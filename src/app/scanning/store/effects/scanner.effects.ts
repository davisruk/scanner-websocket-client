import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap } from "rxjs/operators";
import * as fromScannerActions from "../actions/scanner.actions";
import { ScannerWebSocketService } from "../../services/scanner-web-socket/scanner-web-socket.service";
import { SocketReturnTypes } from "../../services/socket-types";
import { of, EMPTY } from "rxjs";

@Injectable()
export class ScannerEffects {
  constructor(
    private actions$: Actions<fromScannerActions.ScannerActions>,
    private scannerService: ScannerWebSocketService
  ) {}

  @Effect()
  connectSocket$ = this.actions$.pipe(
    ofType(fromScannerActions.ScannerActionTypes.ConnectSocket),
    switchMap(() => this.scannerService._connectSocket()),
    switchMap((result) => {
      return of(
        new fromScannerActions.ConnectSocketResult({
          connected: result === SocketReturnTypes.ConnectSocketSuccess,
          message: result,
        })
      );
    })
  );

  @Effect()
  startListener$ = this.actions$.pipe(
    ofType(fromScannerActions.ScannerActionTypes.StartScannerEventListener),
    switchMap(() => {
      this.scannerService._listenForScanningEvents();
      return EMPTY;
    })
  );

  @Effect()
  scannerStatusQuery$ = this.actions$.pipe(
    ofType(fromScannerActions.ScannerActionTypes.ScannerStatusQuery),
    switchMap(() => {
      this.scannerService._sendScannerStatusQuery();
      return EMPTY;
    })
  );

  @Effect()
  scannerReConnect$ = this.actions$.pipe(
    ofType(fromScannerActions.ScannerActionTypes.ReconnectScanner),
    switchMap(() => {
      this.scannerService._sendReconnectScanner();
      return EMPTY;
    })
  );

  @Effect()
  scannerDisconnect$ = this.actions$.pipe(
    ofType(fromScannerActions.ScannerActionTypes.DisconnectSocket),
    switchMap(() => this.scannerService._disconnectSocket()),
    switchMap((result) => {
      return of(
        new fromScannerActions.ConnectSocketResult({
          connected: false,
          message: result,
        })
      );
    })
  );
}
