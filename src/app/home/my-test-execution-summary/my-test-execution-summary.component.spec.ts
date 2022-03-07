import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestExecutionSummaryComponent } from './my-test-execution-summary.component';

describe('MyTestExecutionSummaryComponent', () => {
  let component: MyTestExecutionSummaryComponent;
  let fixture: ComponentFixture<MyTestExecutionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTestExecutionSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestExecutionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
