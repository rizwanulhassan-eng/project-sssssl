import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatingComponent } from './bus-seating.component';

describe('BusSeatingComponent', () => {
  let component: BusSeatingComponent;
  let fixture: ComponentFixture<BusSeatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSeatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
