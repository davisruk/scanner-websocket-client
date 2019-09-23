import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from './web-socket-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor() {
    console.log('new instance');
  }

  title = 'Scanner WebSocket Client';

  webSocketAPI: WebSocketAPI;
  dataMessage: string;
  scannerStatusMessage: string;
  name: string;
  connected: boolean;
  reConnectScannerDisabled: boolean;
  ngOnInit() {
    console.log('initialisation');
    this.reConnectScannerDisabled = true;
    this.webSocketAPI = new WebSocketAPI(this);
  }

  connect() {
    this.webSocketAPI._connect();
    setTimeout(() => {
      this.connected = true;
      this.scannerStatus();
    }, 1000);
  }

  disconnect() {
    this.webSocketAPI._disconnect();
    this.connected = false;
  }

  reconnectScanner() {
    this.webSocketAPI._sendReconnect();
  }

  scannerStatus() {
    this.webSocketAPI._sendStatusQuery();
  }

  handleMessage(message: string) {
    if (message.startsWith('[STATUS]')) {
      this.scannerStatusMessage = message;
      if (message.search('opened') !== -1) {
        this.reConnectScannerDisabled = true;
      } else if (message.search('no available ports found') !== -1) {
        this.reConnectScannerDisabled = false;
      } else if (message.search(':Open') !== -1) {
        this.reConnectScannerDisabled = true;
      } else if (message.search(':Closed') !== -1) {
        this.reConnectScannerDisabled = false;
      }
    } else {
      this.dataMessage = message;
    }
  }
}
