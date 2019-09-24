import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ScannerEffects } from './scanner.effects';

describe('ScannerEffects', () => {
  let actions$: Observable<any>;
  let effects: ScannerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScannerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ScannerEffects>(ScannerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
