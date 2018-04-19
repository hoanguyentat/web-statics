import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticWeekComponent } from './static-week.component';

describe('StaticWeekComponent', () => {
  let component: StaticWeekComponent;
  let fixture: ComponentFixture<StaticWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
