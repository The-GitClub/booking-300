import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOrManagerComponent } from './staff-or-manager.component';

describe('StaffOrManagerComponent', () => {
  let component: StaffOrManagerComponent;
  let fixture: ComponentFixture<StaffOrManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffOrManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOrManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
