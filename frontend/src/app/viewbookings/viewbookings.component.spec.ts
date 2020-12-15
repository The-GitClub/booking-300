import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewbookingsComponent } from './viewbookings.component';

describe('ViewbookingsComponent', () => {
  let component: ViewbookingsComponent;
  let fixture: ComponentFixture<ViewbookingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
