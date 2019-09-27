import { ScannerState } from './scanner.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScannerActions, ScannerActionTypes } from '../actions/scanner.actions';

export const scannerFeatureKey = 'scanningState';

export interface SocketState {
  socketStatusMessage: string;
  socketConnected: boolean;
}

const initialSocketState: SocketState = {
  socketStatusMessage: '[SOCK] Disconnected',
  socketConnected: false
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
  statusMessage: '[SCANNER] Status Unknown',
  dataMessage: ''
};

export interface State {
  socket: SocketState;
  scanner: ScannerState;
}

const initialState: State = {
  socket: initialSocketState,
  scanner: initialScannerState
};

export const selectScanningState = createFeatureSelector<State>(
  'scanningState'
);
export const selectSocketState = createSelector(
  selectScanningState,
  state => state.socket
);
export const selectScannerState = createSelector(
  selectScanningState,
  state => state.scanner
);

export function reducer(state = initialState, action: ScannerActions): State {
  switch (action.type) {
    case ScannerActionTypes.ConnectSocketSuccess: {
      if (!action.payload.connected) {
        return {
          scanner: initialScannerState,
          socket: {
            socketConnected: action.payload.connected,
            socketStatusMessage: action.payload.message
          }
        };
      }
      return {
        ...state,
        socket: {
          socketConnected: action.payload.connected,
          socketStatusMessage: action.payload.message
        }
      };
    }
    case ScannerActionTypes.ScannerEventListenerNotification: {
      return {
        ...state,
        scanner: action.payload.status
      };
    }

    default:
      return state;
  }
}
