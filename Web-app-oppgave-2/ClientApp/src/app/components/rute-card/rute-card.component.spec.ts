import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuteCardComponent } from './rute-card.component';

describe('RuteCardComponent', () => {
  let component: RuteCardComponent;
  let fixture: ComponentFixture<RuteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
