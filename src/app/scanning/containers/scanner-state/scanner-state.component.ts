import { ScannerState } from './../../store/reducers/scanner.reducer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scanner-state',
  templateUrl: './scanner-state.component.html',
  styleUrls: ['./scanner-state.component.sass']
})
export class ScannerStateComponent implements OnInit {
  @Input() scannerState: ScannerState;

  constructor() {}

  ngOnInit() {}
}
