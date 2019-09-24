import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  selectScannerState,
  selectSocketState
} from '../../store/reducers/scanner.reducer';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.sass']
})
export class ScannerPageComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.select(selectSocketState).subscribe(socketState => {
      console.log(socketState);
    });

    this.store.select(selectScannerState).subscribe(scannerState => {
      console.log(scannerState);
    });
  }
}
