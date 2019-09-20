import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  // webSocketEndPoint = 'http://192.168.1.71:8080/ws';
  topic = '/topic/greetings';
  stompClient: any;
  appComponent: AppComponent;

  constructor(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      frame => {
        this.stompClient.subscribe(this.topic, sdkEvent => {
          this.onMessageReceived(sdkEvent);
        });
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _sendReconnect() {
    this.stompClient.send('/app/reconnectScanner', {});
  }

  _sendStatusQuery() {
    this.stompClient.send('/app/scannerStatus', {});
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server : ' + message);
    this.appComponent.handleMessage(message.body);
  }
}
