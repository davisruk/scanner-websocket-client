import { TestBed } from '@angular/core/testing';

import { ScannerWebSocketService } from './scanner-web-socket.service';

describe('ScannerWebSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScannerWebSocketService = TestBed.get(ScannerWebSocketService);
    expect(service).toBeTruthy();
  });
});
