import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaaltidCardComponent } from './maaltid-card.component';

describe('MaaltidCardComponent', () => {
  let component: MaaltidCardComponent;
  let fixture: ComponentFixture<MaaltidCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaaltidCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaaltidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
