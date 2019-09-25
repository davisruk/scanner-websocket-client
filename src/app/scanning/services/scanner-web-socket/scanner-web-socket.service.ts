import { Subject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ScanningModule } from '../../scanning.module';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Store } from '@ngrx/store';
import { State } from '../../store/reducers/scanner.reducer';
import { ScannerEventListenerNotification } from '../../store/actions/scanner.actions';

@Injectable()
export class ScannerWebSocketService {
  constructor(private store: Store<State>) {}

  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/com';
  stompClient: any;

  _connectSocket(): Observable<string> {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const connectResult = new Subject<string>();
    this.stompClient.connect(
      {},
      (_: any) => connectResult.next('[SOCK] Successfully Connected'),
      (_: any) => connectResult.next('[SOCK] Connect Error')
    );
    return connectResult.asObservable();
  }

  _listenForScanningEvents() {
    this.stompClient.subscribe(this.topic, (sdkEvent: any) => {
      this.store.dispatch(
        new ScannerEventListenerNotification({ message: sdkEvent.body })
      );
    });
  }

  _disconnectSocket(): Observable<string> {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    return of('[SOCK] Disconnected');
  }

  _sendReconnectScanner() {
    this.stompClient.send('/app/reconnectScanner', {});
  }

  _sendScannerStatusQuery() {
    this.stompClient.send('/app/scannerStatus', {});
  }
}
