import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ScannerActionTypes, ScannerActions } from '../actions/scanner.actions';



@Injectable()
export class ScannerEffects {


  @Effect()
  loadScanners$ = this.actions$.pipe(
    ofType(ScannerActionTypes.LoadScanners),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<ScannerActions>) {}

}
