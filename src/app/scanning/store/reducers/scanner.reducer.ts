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
      return handleMessage(state, action.payload.message);
    }

    default:
      return state;
  }
}

function handleMessage(currentState: State, message: string): State {
  if (message.startsWith('[STATUS]')) {
    return {
      ...currentState,
      scanner: handleScannerMessage(currentState.scanner, message)
    };
  } else if (message.startsWith('[SOCK]')) {
    return {
      ...currentState,
      socket: handleSocketMessage(currentState.socket, message)
    };
  } else {
    return {
      ...currentState,
      scanner: { ...currentState.scanner, dataMessage: message }
    };
  }
}

function handleScannerMessage(
  currentState: ScannerState,
  message: string
): ScannerState {
  let isConnected =
    message.search('opened') !== -1 || message.search(':Open') !== -1;
  if (isConnected && !currentState.connected) {
    return { ...currentState, statusMessage: message, connected: isConnected };
  }
  isConnected =
    message.search('no available ports found') !== -1 ||
    message.search(':Closed') !== -1;
  if (!isConnected && currentState.connected) {
    return { ...currentState, statusMessage: message, connected: isConnected };
  }
  return { ...currentState, statusMessage: message };
}

function handleSocketMessage(
  currentState: SocketState,
  message: string
): SocketState {
  if (message.search('Error')) {
    return { socketConnected: false, socketStatusMessage: message };
  }
  return { ...currentState, socketStatusMessage: message };
}
