import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestThisComponent } from './test-this.component';

describe('TestThisComponent', () => {
  let component: TestThisComponent;
  let fixture: ComponentFixture<TestThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
