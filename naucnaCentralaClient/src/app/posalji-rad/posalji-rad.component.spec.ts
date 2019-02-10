import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosaljiRadComponent } from './posalji-rad.component';

describe('PosaljiRadComponent', () => {
  let component: PosaljiRadComponent;
  let fixture: ComponentFixture<PosaljiRadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosaljiRadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosaljiRadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
