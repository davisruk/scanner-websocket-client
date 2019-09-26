import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerStateComponent } from './scanner-state.component';

describe('ScannerStateComponent', () => {
  let component: ScannerStateComponent;
  let fixture: ComponentFixture<ScannerStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
