import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestExecutionResultsComponent } from './my-test-execution-results.component';

describe('MyTestExecutionResultsComponent', () => {
  let component: MyTestExecutionResultsComponent;
  let fixture: ComponentFixture<MyTestExecutionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTestExecutionResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestExecutionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
