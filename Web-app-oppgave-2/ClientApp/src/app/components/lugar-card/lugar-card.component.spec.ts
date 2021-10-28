import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarCardComponent } from './lugar-card.component';

describe('LugarCardComponent', () => {
  let component: LugarCardComponent;
  let fixture: ComponentFixture<LugarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugarCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
