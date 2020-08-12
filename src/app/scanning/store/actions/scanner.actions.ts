import { ScannerState } from "./../reducers/scanner.reducer";
import { Action } from "@ngrx/store";

export enum ScannerActionTypes {
  ConnectSocket = "[Scanner] Connect Socket",
  ConnectSocketResult = "[Scanner] Connect Socket Result",
  DisconnectSocket = "[Scanner] Disonnect Socket",
  StartScannerEventListener = "[Scanner] Scanner Event Listen",
  ScannerEventListenerNotification = "[Scanner] Scanner Event Notification",
  ReconnectScanner = "[Scanner] Reconnect Scanner",
  ScannerStatusQuery = "[Scanner] Scanner Status Query",
}

export class ConnectSocket implements Action {
  readonly type = ScannerActionTypes.ConnectSocket;
}

export class ConnectSocketResult implements Action {
  readonly type = ScannerActionTypes.ConnectSocketResult;
  constructor(public payload: ConnectSocketResultPayload) {}
}

export class ConnectSocketResultPayload {
  connected: boolean;
  message: string;
}

export class ReconnectScanner implements Action {
  readonly type = ScannerActionTypes.ReconnectScanner;
}

export class DisconnectSocket implements Action {
  readonly type = ScannerActionTypes.DisconnectSocket;
}

export class ScannerStatusQuery implements Action {
  readonly type = ScannerActionTypes.ScannerStatusQuery;
}

export class StartScannerEventListener implements Action {
  readonly type = ScannerActionTypes.StartScannerEventListener;
}

export class ScannerEventListenerNotificationPayload {
  status: ScannerState;
}

export class ScannerEventListenerNotification implements Action {
  readonly type = ScannerActionTypes.ScannerEventListenerNotification;
  constructor(public payload: ScannerEventListenerNotificationPayload) {}
}

export type ScannerActions =
  | ConnectSocket
  | ReconnectScanner
  | DisconnectSocket
  | ScannerStatusQuery
  | ConnectSocketResult
  | StartScannerEventListener
  | ScannerEventListenerNotification;
