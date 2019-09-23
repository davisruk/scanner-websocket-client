import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from '../web-socket-api';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.sass']
})
export class ScannerComponent implements OnInit {
  webSocketAPI: WebSocketAPI;
  dataMessage: string;
  scannerStatusMessage: string;
  name: string;
  connected: boolean;
  reConnectScannerDisabled: boolean;
  socketStatus: string;

  ngOnInit() {
    this.reConnectScannerDisabled = true;
    this.webSocketAPI = new WebSocketAPI();
    this.socketStatus = 'Disconnected';
    this.scannerStatusMessage = 'Unavailable - socket closed';
  }

  connect() {
    this.webSocketAPI._connect().subscribe((connectResult: string) => {
      this.connected = true;
      this.handleMessage(connectResult);
      this.webSocketAPI
        ._subscribe()
        .subscribe((message: string) => this.handleMessage(message));
      this.scannerStatus();
    });
  }

  disconnect() {
    this.webSocketAPI._disconnect();
    this.connected = false;
    this.reConnectScannerDisabled = true;
    this.socketStatus = 'Disconnected';
    this.scannerStatusMessage = 'Unavailable - socket closed';
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
    } else if (message.startsWith('[SOCK]')) {
      if (message.search('Error')) {
        this.connected = false;
      }
      this.socketStatus = message;
    } else {
      this.dataMessage = message;
    }
  }
}
