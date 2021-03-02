import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardupdateComponent } from './admindashboardupdate.component';

describe('AdmindashboardupdateComponent', () => {
  let component: AdmindashboardupdateComponent;
  let fixture: ComponentFixture<AdmindashboardupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindashboardupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindashboardupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
