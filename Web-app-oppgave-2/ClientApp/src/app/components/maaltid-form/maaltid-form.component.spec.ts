import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaaltidFormComponent } from './maaltid-form.component';

describe('MaaltidFormComponent', () => {
  let component: MaaltidFormComponent;
  let fixture: ComponentFixture<MaaltidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaaltidFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaaltidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
