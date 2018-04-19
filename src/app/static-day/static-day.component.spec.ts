import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticDayComponent } from './static-day.component';

describe('StaticDayComponent', () => {
  let component: StaticDayComponent;
  let fixture: ComponentFixture<StaticDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
