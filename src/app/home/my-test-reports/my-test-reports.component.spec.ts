import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTestReportsComponent } from './my-test-reports.component';

describe('MyTestReportsComponent', () => {
  let component: MyTestReportsComponent;
  let fixture: ComponentFixture<MyTestReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTestReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTestReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
