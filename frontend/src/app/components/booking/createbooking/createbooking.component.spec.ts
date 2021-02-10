import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatebookingComponent } from './createbooking.component';

describe('CreatebookingComponent', () => {
  let component: CreatebookingComponent;
  let fixture: ComponentFixture<CreatebookingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
