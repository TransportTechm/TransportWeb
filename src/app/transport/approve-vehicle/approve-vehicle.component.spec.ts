import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveVehicleComponent } from './approve-vehicle.component';

describe('ApproveVehicleComponent', () => {
  let component: ApproveVehicleComponent;
  let fixture: ComponentFixture<ApproveVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
