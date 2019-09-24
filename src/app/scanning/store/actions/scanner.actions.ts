import { Action } from '@ngrx/store';

export enum ScannerActionTypes {
  LoadScanners = '[Scanner] Load Scanners'
}

export class LoadScanners implements Action {
  readonly type = ScannerActionTypes.LoadScanners;
}

export type ScannerActions = LoadScanners;
