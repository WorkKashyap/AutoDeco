import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroundhoursComponent } from './addroundhours.component';

describe('AddroundhoursComponent', () => {
  let component: AddroundhoursComponent;
  let fixture: ComponentFixture<AddroundhoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddroundhoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddroundhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
