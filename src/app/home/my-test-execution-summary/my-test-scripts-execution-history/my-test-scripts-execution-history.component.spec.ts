import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestScriptsExecutionHistoryComponent } from './my-test-scripts-execution-history.component';

describe('MyTestScriptsExecutionHistoryComponent', () => {
  let component: MyTestScriptsExecutionHistoryComponent;
  let fixture: ComponentFixture<MyTestScriptsExecutionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTestScriptsExecutionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestScriptsExecutionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
