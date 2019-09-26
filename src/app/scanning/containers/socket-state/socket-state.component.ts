import { SocketState } from './../../store/reducers/scanner.reducer';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-socket-state',
  templateUrl: './socket-state.component.html',
  styleUrls: ['./socket-state.component.sass']
})
export class SocketStateComponent implements OnInit {
  constructor() {}
  @Input() socketState: SocketState;
  @Output() toggleState = new EventEmitter<SocketState>();
  ngOnInit() {}

  handleToggleSocket(state: SocketState) {
    this.toggleState.emit(state);
  }
}
