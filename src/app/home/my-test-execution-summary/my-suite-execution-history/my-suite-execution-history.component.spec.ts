import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuiteExecutionHistoryComponent } from './my-suite-execution-history.component';

describe('MySuiteExecutionHistoryComponent', () => {
  let component: MySuiteExecutionHistoryComponent;
  let fixture: ComponentFixture<MySuiteExecutionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySuiteExecutionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySuiteExecutionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
