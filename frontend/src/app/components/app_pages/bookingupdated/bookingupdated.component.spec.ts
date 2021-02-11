import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingupdatedComponent } from './bookingupdated.component';

describe('BookingupdatedComponent', () => {
  let component: BookingupdatedComponent;
  let fixture: ComponentFixture<BookingupdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingupdatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingupdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
