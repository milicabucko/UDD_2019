import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzdanjaMagazinaComponent } from './izdanja-magazina.component';

describe('IzdanjaMagazinaComponent', () => {
  let component: IzdanjaMagazinaComponent;
  let fixture: ComponentFixture<IzdanjaMagazinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzdanjaMagazinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzdanjaMagazinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
