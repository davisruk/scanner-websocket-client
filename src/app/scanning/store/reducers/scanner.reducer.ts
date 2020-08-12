import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScannerActions, ScannerActionTypes } from "../actions/scanner.actions";
import { SocketReturnTypes } from "../../services/socket-types";

export const scannerFeatureKey = "scanningState";

export interface SocketState {
  socketStatusMessage: string;
  socketConnected: boolean;
}

const initialSocketState: SocketState = {
  socketStatusMessage: SocketReturnTypes.SocketDisconnected,
  socketConnected: false,
};

export interface ScannerState {
  attemptingConnection: boolean;
  connected: boolean;
  statusMessage: string;
  dataMessage: string;
}

const initialScannerState: ScannerState = {
  attemptingConnection: false,
  connected: false,
  statusMessage: "[SCANNER] Status Unknown",
  dataMessage: "",
};

export interface State {
  socket: SocketState;
  scanner: ScannerState;
}

const initialState: State = {
  socket: initialSocketState,
  scanner: initialScannerState,
};

export const selectScanningState = createFeatureSelector<State>(
  "scanningState"
);
export const selectSocketState = createSelector(
  selectScanningState,
  (state) => state.socket
);
export const selectScannerState = createSelector(
  selectScanningState,
  (state) => state.scanner
);
export const selectScannerStatusMessage = createSelector(
  selectScannerState,
  (state) => state.statusMessage
);

export function reducer(state = initialState, action: ScannerActions): State {
  switch (action.type) {
    case ScannerActionTypes.ConnectSocketResult: {
      if (!action.payload.connected) {
        return {
          scanner: initialScannerState,
          socket: {
            socketConnected: action.payload.connected,
            socketStatusMessage: action.payload.message,
          },
        };
      }
      return {
        ...state,
        socket: {
          socketConnected: action.payload.connected,
          socketStatusMessage: action.payload.message,
        },
      };
    }
    case ScannerActionTypes.ScannerEventListenerNotification: {
      return {
        ...state,
        scanner: action.payload.status,
      };
    }

    default:
      return state;
  }
}
