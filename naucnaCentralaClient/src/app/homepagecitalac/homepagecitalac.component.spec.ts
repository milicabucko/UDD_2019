import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagecitalacComponent } from './homepagecitalac.component';

describe('HomepagecitalacComponent', () => {
  let component: HomepagecitalacComponent;
  let fixture: ComponentFixture<HomepagecitalacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagecitalacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagecitalacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
