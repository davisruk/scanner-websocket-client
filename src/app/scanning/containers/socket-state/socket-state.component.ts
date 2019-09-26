import { Component, OnInit, Input } from '@angular/core';
import { SocketState } from '../../store/reducers/scanner.reducer';

@Component({
  selector: 'app-socket-state',
  templateUrl: './socket-state.component.html',
  styleUrls: ['./socket-state.component.sass']
})
export class SocketStateComponent implements OnInit {
  constructor() {}
  @Input() socketState: SocketState;
  ngOnInit() {}
}
