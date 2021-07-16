import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionSummaryComponent } from './rejection-summary.component';

describe('RejectionDetailComponent', () => {
  let component: RejectionSummaryComponent;
  let fixture: ComponentFixture<RejectionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
