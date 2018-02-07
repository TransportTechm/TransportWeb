import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBusComponent } from './request-bus.component';

describe('RequestBusComponent', () => {
  let component: RequestBusComponent;
  let fixture: ComponentFixture<RequestBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
