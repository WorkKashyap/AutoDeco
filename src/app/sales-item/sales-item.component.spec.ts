import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesItemComponent } from './sales-item.component';

describe('SalesItemComponent', () => {
  let component: SalesItemComponent;
  let fixture: ComponentFixture<SalesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
