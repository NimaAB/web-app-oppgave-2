import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarerComponent } from './lugarer.component';

describe('LugarerComponent', () => {
  let component: LugarerComponent;
  let fixture: ComponentFixture<LugarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LugarerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LugarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
