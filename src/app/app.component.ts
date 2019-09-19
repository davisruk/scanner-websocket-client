import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from './web-socket-api';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef) {}

  title = 'Scanner WebSocket Client';

  webSocketAPI: WebSocketAPI;
  greeting: string;
  name: string;
  connected: boolean;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this);
  }

  connect() {
    this.webSocketAPI._connect();
    this.connected = true;
  }

  disconnect() {
    this.webSocketAPI._disconnect();
    this.connected = false;
  }

  handleMessage(message: string) {
    this.greeting = message;
  }
}
