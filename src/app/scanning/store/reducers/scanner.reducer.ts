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
  connected: boolean;
  statusMessage: string;
  dataMessage: string;
}

const initialScannerState: ScannerState = {
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
    case ScannerActionTypes.LoadScanners:
      return state;

    default:
      return state;
  }
}
