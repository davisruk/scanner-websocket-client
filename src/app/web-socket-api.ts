import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject, Observable, of } from 'rxjs';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  topic = '/topic/com';
  stompClient: any;

  _connect(): Observable<string> {
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

  _subscribe(): Observable<string> {
    const messageResult = new Subject<string>();
    this.stompClient.subscribe(this.topic, (sdkEvent: any) => {
      messageResult.next(sdkEvent.body);
    });
    return messageResult.asObservable();
  }

  _disconnect(): Observable<string> {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    return of('[SOCK] Disconnected');
  }

  _sendReconnect() {
    this.stompClient.send('/app/reconnectScanner', {});
  }

  _sendStatusQuery() {
    this.stompClient.send('/app/scannerStatus', {});
  }
}
