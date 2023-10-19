import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcmNotificationComponent } from './gcm-notification.component';

describe('GcmNotificationComponent', () => {
  let component: GcmNotificationComponent;
  let fixture: ComponentFixture<GcmNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GcmNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GcmNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
