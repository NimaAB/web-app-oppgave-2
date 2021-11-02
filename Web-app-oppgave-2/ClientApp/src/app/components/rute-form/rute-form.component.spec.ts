import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuteFormComponent } from './rute-form.component';

describe('RuteFormComponent', () => {
  let component: RuteFormComponent;
  let fixture: ComponentFixture<RuteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
