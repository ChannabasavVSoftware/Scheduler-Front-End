import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAppointmentComponent } from './scheduled-appointment.component';

describe('ScheduledAppointmentComponent', () => {
  let component: ScheduledAppointmentComponent;
  let fixture: ComponentFixture<ScheduledAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduledAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
